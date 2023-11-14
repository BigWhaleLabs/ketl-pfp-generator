import { animePrompt, basePrompt } from './configs'
import splitByCapitalLetters from '../helpers/splitByCapitalLetters'

export default function generatePrompt(nickname: string) {
  const splittedNickname = splitByCapitalLetters(nickname).toString()

  const randomNumber = Math.random() * 100
  const prompt = randomNumber < 2 ? animePrompt : basePrompt

  return `${prompt}, ${splittedNickname}`
}
