import { basePrompt } from './configs'

export default function generatePrompt(nickname: string) {
  return basePrompt(nickname)
}
