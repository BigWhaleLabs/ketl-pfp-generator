import generatePrompt from './prompts'
import sendImageRequest from './sendImageRequest'

export default function generateImage(nickname: string) {
  const prompt = generatePrompt(nickname)

  return sendImageRequest({ prompt })
}
