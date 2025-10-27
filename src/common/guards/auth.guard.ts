import { 
   Injectable, 
   CanActivate, 
   ExecutionContext,
   UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private userService: UserService,
    private jwtService: JwtService) {}

   async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token: string;

    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
      token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.userService.findById(decoded.sub); 
      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Not authorized to access this resource');
    }
  }
}
