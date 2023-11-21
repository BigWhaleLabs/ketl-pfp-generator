import splitByCapitalLetters from './splitByCapitalLetters'

export enum PromptVariant {
  base = 'base',
  version2 = 'version2',
}

export const prompts = {
  [PromptVariant.base]: (nickname: string) => `
  Photorealistic portrait of an animal following the general theme of "${splitByCapitalLetters(
    nickname
  ).join(' ')}" to be used as a profile picture without any text
  `,
  [PromptVariant.version2]: (nickname: string) => `
  can you generate a cute image for me in simple cartoon style for PFP without much details 
  so it could be visible at 128x128 resolution and inspired by "${splitByCapitalLetters(
    nickname
  ).join(' ')}" 
  or whatever closest meaning you can find with these words, please details as low as possible, it shouldn't be overhelmed
  `,
}

export const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}
