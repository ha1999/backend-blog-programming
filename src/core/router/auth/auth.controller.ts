import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthData } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dataAuth: AuthData,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const isAuth = await this.authService.validateUser(dataAuth);
      if (isAuth) {
        const token = this.authService.generateToken(isAuth);
        res.cookie('token', token, { httpOnly: true, secure: false });
        return { auth: isAuth };
      } else res.status(400).json({ message: 'Email or passwd is incorrect' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('token', '');
    return { status: 'ok' };
  }
}
