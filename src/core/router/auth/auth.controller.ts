import { Body, Controller, Post, Res, Req } from '@nestjs/common'
import { Response } from 'express'
import { verifyTokenGoogle } from 'src/utils/OAuth2Client'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '')
    return { status: 'ok' }
  }

  @Post('google-login-admin')
  googleLoginAdmin(
    @Body('token') token: string,
    @Res() res: Response,
  ) {
    verifyTokenGoogle(token)
      .then((user) => {
        this.authService.checkEmployee(user.email).then((isEmployee) => {
          if (isEmployee) {
            const token = this.authService.generateToken(user)
            res.cookie('token', token, { httpOnly: true, secure: false })
            res.json({ auth: user })
          } 
          else res.status(403).json({ error: "You have'nt in us system" })
        })
      })
      .catch((error) => res.status(400).json({ error }))
  }

  @Post('google-login-user')
  googleLoginUser(
    @Body('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    verifyTokenGoogle(token)
      .then((user) => {
        this.authService.checkUserExist(user).then(() => {
          const token = this.authService.generateToken(user)
          res.cookie('token', token, { httpOnly: true, secure: false })
          res.json({ auth: user })
        })
      })
      .catch((error) => res.status(400).json({ error }))
  }
}
