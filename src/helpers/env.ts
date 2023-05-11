import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  IPFS_UPLOADER: str({ default: 'https://ipfs.sealcred.xyz/file/image' }),
  MONGO: str(),
  PORT: num({ default: 1337 }),
  SD_API_TOKEN: str(),
  SD_API_URI: str({
    default: 'https://stablediffusionapi.com/api/v3/dreambooth',
  }),
})
