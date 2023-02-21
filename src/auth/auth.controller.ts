import { Controller, UseGuards, Post, Req } from '@nestjs/common';
import { User } from 'src/users/models/user';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: Request) {
    return this.authService.login((request as any).user as User);
  }
}
