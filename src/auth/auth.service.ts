import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/common/email/email.service';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly authModel: Model<UserDocument>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) { }

  /**
   * @param email The email of the user to register.
   * @param password The password of the user to register.
   */
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.authModel({
      email,
      password: hashedPassword,
    });
    await user.save();

    // Send verification email
    const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/verify-email?token=${token}`;
    await this.emailService.sendVerificationEmail(user.email, verificationLink);

    return user;
  }




  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: (user as any)._id.toString() };
      return {
        token: this.jwtService.sign(payload),
        message: 'Login successful',
      };
    }
    throw new BadRequestException('Invalid credentials');
  }


  async logout() {
    return { message: 'Logout successful' };
  }


  async refreshToken(oldToken: string) {
    try {
      const decoded = this.jwtService.verify(oldToken);
      
      if (!decoded || !decoded.sub || !decoded.email) {
        throw new BadRequestException('Invalid token payload');
      }

      const payload = { email: decoded.email, sub: decoded.sub };
      return {
        refresh_token: this.jwtService.sign(payload),
        message: 'Token refreshed successfully',
      };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token');
    }
  }


  async forgotPassword(email: string) {
    const user = await this.authModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/reset-password?token=${token}`;

    await this.emailService.sendResetPasswordEmail(user.email, resetLink);

    return { message: 'Reset password link sent to your email' };
  }



  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      
      if (!decoded || !decoded.email) {
        throw new BadRequestException('Invalid token payload');
      }

      const user = await this.authModel.findOne({ email: decoded.email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return { message: 'Password reset successful' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid or expired token');
    }
  }


  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      
      if (!decoded || !decoded.email) {
        throw new BadRequestException('Invalid token payload');
      }

      const user = await this.authModel.findOne({ email: decoded.email }).exec();
      if (!user) {
        throw new NotFoundException('User not found');
      }

      user.isVerified = true;
      await user.save();
      return { message: 'Email verified successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Invalid or expired token');
    }
  }




  async resendEmailVerification(email: string) {
    const user = await this.authModel.findOne({ email }).exec();
    if (!user || user.isVerified) {
      throw new BadRequestException('User not found or already verified');
    }

    const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:4200'}/verify-email?token=${token}`;

    await this.emailService.sendVerificationEmail(user.email, verificationLink);
    return { message: 'Verification email resent' };
  }


  async getLoggedInUserProfile(id: string) {
    const user = await this.authModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updatePassword() {
    return { message: 'Password updated successfully' };
  }


  async findByEmail(email: string): Promise<User | undefined> {
    return await this.authModel.findOne({ email }).exec();
  }
}
