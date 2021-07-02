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
export const port = process.env.PORT || 9000
export const origin = process.env.ORIGIN || 'http://localhost:3009'
export const url_mongo = process.env.URL_MONGO || 'mongodb://localhost:27017/blog'
export const type_orm_pg = {
    type: "postgres",
    host: process.env.HOST_PG || "localhost",
    port: parseInt(process.env.PORT_PG) || 8888,
    username: process.env.USER_NAME_PG || "postgres",
    password: process.env.PASSWD_PG || "docker",
    database: process.env.DB_PG || "blog",
    entities: ["dist/**/*.entity{.ts,.js}"],
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    synchronize: true,
    logging: true,
    autoLoadEntities: true
  }


  