import * as dotenv from 'dotenv'
import { cleanEnv, num, str } from 'envalid'
import { cwd } from 'process'
import { resolve } from 'path'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
  IPFS_UPLOADER: str(),
  MONGO: str(),
  OPENAI_API_KEY: str(),
  PORT: num({ default: 1337 }),
})
