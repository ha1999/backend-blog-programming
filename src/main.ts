import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as session from 'express-session'
import * as helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common'
import { LoggerMiddleware } from './core/middlewares/logger.middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
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
    origin: 'http://localhost:8000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.use(LoggerMiddleware)

  await app.listen(9000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
