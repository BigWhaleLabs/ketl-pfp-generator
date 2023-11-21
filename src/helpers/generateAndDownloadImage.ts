import { Readable } from 'stream'
import { isAxiosError } from 'axios'
import fetchProfileImage from './fetchProfileImage'
import generateImage from './generateImage'

export default async function generateAndDownloadImage(
  prompt: string,
  attempt = 1
): Promise<Readable> {
  try {
    const url = await generateImage(prompt)
    if (!url) throw new Error('Empty image url')
    return await fetchProfileImage(url)
  } catch (e) {
    if (isAxiosError(e) && e.response?.status === 404 && attempt > 0) {
      console.log('retry generate new image')
      return generateAndDownloadImage(prompt, attempt - 1)
    }
    console.error(e)
    throw new Error(`Couldn't fetch the image`, { cause: e })
  }
}
