import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as session from 'express-session'
import * as helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { LoggerMiddleware } from './core/middlewares/logger.middleware'
import { port, origin } from 'config/configuration'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.use(cookieParser())
  app.use(compression())
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  )
  app.use(helmet())
  app.enableCors({
    origin: origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.use(LoggerMiddleware)
  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
