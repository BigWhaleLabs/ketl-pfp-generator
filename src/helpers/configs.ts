import splitByCapitalLetters from './splitByCapitalLetters'

export const basePrompt = (nickname: string) => `
Photorealistic portrait of an animal following the general theme of "${splitByCapitalLetters(
  nickname
).join(' ')}" to be used as a profile picture without any text
`

export const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}
