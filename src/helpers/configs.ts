import { Config } from 'unique-names-generator'
import { animalDictionary, colorDictionary } from './nameDictionary'
import env from './env'

export const basePrompt = 'fantasy, cute animal, animal, cute'
export const negativePrompt =
  'anime, anime girl, anime woman, anime women, body with camera lens, lens in body, camera in body, watermark, text, signs, furry, furries, abstract, abstract figures, loli, lolicon, shotacon, shota, anime girls with swords'

export const baseConfig = {
  enhance_prompt: true,
  height: 512,
  key: env.SD_API_TOKEN,
  model_id: 'anything-v4',
  negative_prompt: negativePrompt,
  num_inference_steps: 30,
  safety_checker: true,
  samples: 1,
  width: 512,
}

export const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const dictionaryConfig: Config = {
  dictionaries: [animalDictionary, colorDictionary],
  length: 2,
  separator: '',
  style: 'capital',
}
