import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string) {
    const user = this.userService.getUserByEmail(email);
    if (!user) return null;

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: any): { access_token: string } {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  verify(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (err) {
      return null;
    }
  }
}
