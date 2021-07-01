import {randomBytes, pbkdf2Sync} from 'crypto'
export const hashPasswd = async (data: string) => {
    const salt = randomBytes(20).toString('base64');
    const hash = pbkdf2Sync(data, salt, 10000, 512, 'sha512').toString('base64')
    return {salt, hash}
}

