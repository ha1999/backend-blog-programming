import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as serviceAccount from '../firebase-adminsdk-node.json'
export const url_firebase = process.env.URL_FIREBASE || 'https://firebasestorage.googleapis.com/v0/b/'
export const bucket_firebase = process.env.BUCKET_FIREBASE || 'blog-programming-d228e.appspot.com'
export const params = {               
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}
export const client_id = process.env.CLIENT_ID
export const port = process.env.PORT || 9000
export const origin = process.env.ORIGIN?.split(',') || ['http://192.168.1.3:3005', 'http://localhost:3005']
export const url_mongo = process.env.URL_MONGO || 'mongodb://localhost:27017/blog'
export const type_orm_pg: TypeOrmModuleOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL_PG,
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: true,
  autoLoadEntities: true
  }
export const transportMail = process.env.GMAIL_TRANSPORT

export const githubSecrets = process.env.GITHUB_SECRETS

export const githubId = process.env.GITHUB_ID


  