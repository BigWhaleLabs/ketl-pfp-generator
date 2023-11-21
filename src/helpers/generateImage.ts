import sendImageRequest from './sendImageRequest'

export default function generateImage(prompt: string) {
  return sendImageRequest({ prompt })
}
