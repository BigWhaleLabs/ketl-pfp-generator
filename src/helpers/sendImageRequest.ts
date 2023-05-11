import { baseConfig, httpOptions } from './configs'
import axios from 'axios'
import env from './env'

export default function ({
  prompt,
  url = env.SD_API_URI,
}: {
  url?: string
  prompt?: string
}) {
  const config = { ...baseConfig, prompt }

  return axios.post(url, config, httpOptions)
}
