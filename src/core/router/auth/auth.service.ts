import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/user.service'
import { JwtService } from '@nestjs/jwt'
import { HttpService } from '@nestjs/axios'
import { CreateUserDtoGH } from '../users/user.dto'
import { User } from '../users/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService
  ) { }

  generateToken(payload: Object): string {
    return this.jwtService.sign(payload)
  }

  verifyToken(token: string): { id: number, name: string, email: string, picture: string } {
    return this.jwtService.verify(token)
  }

  async checkEmployee(email: string) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) return false
    else return user.id
  }

  async checkUserLoginWithGG(user: { email: string, name: string, picture: string }) {
    const userCheck = await this.usersService.findByEmail(user.email)
    if (userCheck) return userCheck
    else {
      const userCreate = await this.usersService.create({
        email: user.email,
        name: user.name,
        avatar: user.picture,
        is_active: true,
      })
      return userCreate
    }
  }

  async checkUserLoginWithGH(user: CreateUserDtoGH) {
    const userCheck = await this.usersService.findByEmail(user.email)
    if (userCheck) return userCheck
    else {
      const userCreate = await this.usersService.createGH(user)
      return userCreate
    }
  }

  async serviceLoginGitHub(code: string): Promise<User> {
    const body = {
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRETS,
      code: code
    }
    const url = 'https://github.com/login/oauth/access_token'
    const header = { headers: { 'accept': 'application/json' } }
    const { data } = await this.httpService.post(url, body, header).toPromise()
    const userInfo = await this.httpService.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${data.access_token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    }).toPromise()

    const { avatar_url, html_url, name, location, company } = userInfo.data

    const emailList = await this.httpService.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${data.access_token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    }).toPromise()
    const email = emailList.data[0].email
    const userData = {
      email,
      name,
      avatar: avatar_url,
      location,
      work: company,
      github: html_url
    }
    const checkUser = await this.checkUserLoginWithGH(userData as CreateUserDtoGH)
    return checkUser
  }

}
