import { basePrompt } from './configs'
import splitByCapitalLetters from '../helpers/splitByCapitalLetters'

export default function generatePrompt(nickname: string) {
  const splittedNickname = splitByCapitalLetters(nickname)
  const splittedAndDivided = splittedNickname.join(', ')
  const splittedWithoutCommas = splittedNickname.join('')
  return `${basePrompt}, ${nickname}, ${splittedAndDivided}, ${splittedWithoutCommas}`
}
