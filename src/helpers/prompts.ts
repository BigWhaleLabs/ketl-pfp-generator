import { animePrompt, basePrompt } from './configs'
import splitByCapitalLetters from '../helpers/splitByCapitalLetters'

export default function generatePrompt(nickname: string) {
  const splittedNickname = splitByCapitalLetters(nickname).toString()

  const randomNumber = Math.random() * 100
  const prompt = randomNumber < 2 ? animePrompt : basePrompt

  return `${prompt} following the general theme of "${splittedNickname}" to be used as a profile picture without any text. Please don't use any symbols. You're like an artist who never studied words and letters. The image shouldn't contain any clues that this is a generated picture`
}
