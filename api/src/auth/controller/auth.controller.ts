import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from '../../decorators';
import { LocalAuthGuard } from '../../security/guards';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    const loginData = await this.authService.login(req.body);
    return loginData;
  }
}
