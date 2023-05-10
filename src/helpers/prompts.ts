import splitByCapitalLetters from '../helpers/splitByCapitalLetters'

export const basePrompt = 'fantasy, cute animal, animal, cute'
export const negativePromot =
  'anime, anime girl, anime woman, anime women, body with camera lens, lens in body, camera in body, watermark, text, signs, furry, furries, abstract, abstract figures, loli, lolicon, shotacon, shota, anime girls with swords'

export default function generatePrompt(nickname: string) {
  const splittedNickname = splitByCapitalLetters(nickname)
  const splittedAndDivided = splittedNickname.join(', ')
  const splittedWithoutCommas = splittedNickname.join('')
  return `${basePrompt}, ${nickname}, ${splittedAndDivided}, ${splittedWithoutCommas}`
}
