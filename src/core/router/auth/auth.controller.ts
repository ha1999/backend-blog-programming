import { Body, Controller, Post, Res, Req, BadGatewayException } from '@nestjs/common'
import { Response } from 'express'
import { Cookies } from 'src/core/decorators/cookie.decorator'
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

  @Post('check-login')
  async checkLogin(@Cookies('token') token: string, @Res({ passthrough: true }) res: Response){
    try {
      return this.authService.verifyToken(token)
    } catch (err) {
      res.status(401)
      return err
    }
  }

  @Post('google-login-admin')
  async googleLoginAdmin(
    @Body('token') token: string,
    @Res() res: Response,
  ) {
    return verifyTokenGoogle(token)
      .then(async (user) => {
        return this.authService.checkEmployee(user.email).then((isEmployee) => {
          if (isEmployee) {
            const token = this.authService.generateToken({...user, id: isEmployee})
            res.cookie('token', token, { httpOnly: true, secure: false })
            res.json({ auth: user })
            return 
          } 
          else res.status(403).json({ error: "You have'nt in us system" })
        })
      })
      .catch((error) => res.status(400).json({ error }))
  }

  @Post('google-login-user')
  async googleLoginUser(
    @Body('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return verifyTokenGoogle(token)
    .then( user => this.authService.checkUserExist(user))
    .then(resp => {
      const token = this.authService.generateToken({id:resp.id , name: resp.name, email: resp.email, avatar: resp.avatar})
      res.cookie('token', token, { httpOnly: true, secure: false })
      return {name: resp.name, email: resp.email, avatar: resp.avatar}
    })
    .catch(err => {
      res.status(500)
      return err
    })
  }
}
