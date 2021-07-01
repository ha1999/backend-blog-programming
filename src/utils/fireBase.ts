import * as admin from "firebase-admin"
import { v4 as uuid } from 'uuid'
import {url_firebase, bucket_firebase, params} from '../../config/configuration'
interface FileInfo{
  originalname: string
  mimetype: string
  buffer: Buffer
}
admin.initializeApp({
  credential: admin.credential.cert(params),
  storageBucket: bucket_firebase,
})
const bucket = admin.storage().bucket()
class FireBase {
  // upload file from request with type is buffer
  async uploadFileWithBuffer(fileName: string, fileUpload: Buffer, typeFile: string): Promise<string> {
    const file = bucket.file(fileName)
    const token = uuid()
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
      contentType: typeFile,
      cacheControl: "public, max-age=31536000",
    }
    return file.save(fileUpload, { metadata })
    .then(()=> `${url_firebase}${bucket_firebase}/o/${fileName.replace(/\//g, "%2F")}?alt=media&token=${token}`)
    .catch(()=> '')
  }
  // delete file by path on firebase
  async deleteFileonFirebase(filePath: string) {
    return bucket.file(filePath).delete()
  }
  // get list image by destination
  async getListFileonFirebase(prefix: string) {
    return bucket.getFiles({prefix}).then( res => res[0].map(data => {
      return `${url_firebase}${data.metadata.bucket}/o/${data.metadata.name.replace(/\//g, "%2F")}?alt=media&token=${data.metadata.metadata.firebaseStorageDownloadTokens}`
    }))
  }
  // multiple upload with promise.all()
  async uploadMultipleFile(listFiles: FileInfo[]) {
    const listPromise = listFiles.map( file => this.uploadFileWithBuffer(file.originalname, file.buffer, file.mimetype))
    return Promise.all(listPromise).then(result => result)
  }
}

const FireBaseClass = new FireBase()

Object.freeze(FireBase)

export default FireBaseClass
