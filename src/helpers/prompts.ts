import { basePrompt } from './configs'
import splitByCapitalLetters from '../helpers/splitByCapitalLetters'

export default function generatePrompt(nickname: string) {
  const splittedNickname = splitByCapitalLetters(nickname)
  return `((${splittedNickname})), ${basePrompt}`
}
