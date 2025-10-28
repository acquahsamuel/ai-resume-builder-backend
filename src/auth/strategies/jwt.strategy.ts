import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable
    });
  }

  async validate(payload: any) {
    // Validate JWT payload without querying database on every request
    // User data is already in the JWT payload for efficiency
    if (!payload || !payload.sub || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }
    
    // Only return minimal user data from JWT to avoid DB queries
    // If full user data is needed, fetch it in the controller/service layer
    return { 
      userId: payload.sub, 
      email: payload.email 
    };
  }
}