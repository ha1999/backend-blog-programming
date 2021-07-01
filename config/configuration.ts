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


  