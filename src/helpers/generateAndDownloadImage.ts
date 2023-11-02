import { Readable } from 'stream'
import { isAxiosError } from 'axios'
import fetchProfileImage from './fetchProfileImage'
import generateImage from './generateImage'

export default async function generateAndDownloadImage(
  nickname: string,
  attempt = 1
): Promise<Readable> {
  try {
    const url = await generateImage(nickname)
    return await fetchProfileImage(url)
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 404 && attempt > 0) {
      console.log('retry generate new image')
      return generateAndDownloadImage(nickname, attempt - 1)
    }
    throw new Error(`Couldn't fetch the image`, { cause: e })
  }
}
