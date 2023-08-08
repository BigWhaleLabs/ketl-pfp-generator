import env from './env'

export const basePrompt =
  'fantasy, animal, cute, ultra realistic close up portrait, hyper detail, cinematic lighting, magic neon, Canon EOS R3, nikon, f/1.4, ISO 200, 1/160s, 8K, RAW, unedited, symmetrical balance, in-frame, 8K'
export const negativePrompt =
  '(anime, anime girl, anime woman, anime women, text), body with camera lens, lens in body, camera in body, watermark, signs, furry, furries, abstract, abstract figures, loli, lolicon, shotacon, shota, anime girls with swords, (deformed, distorted, disfigured:1.3), poorly drawn, bad anatomy, wrong anatomy, extra limb, missing limb, floating limbs, (mutated hands and fingers:1.4), disconnected limbs, mutation, mutated, ugly, disgusting, blurry'

export const baseConfig = {
  key: env.SD_API_TOKEN,
  model_id: 'revanimated',
  negative_prompt: negativePrompt,
  safety_checker: true,
  samples: 1,
  scheduler: 'EulerDiscreteScheduler',
  self_attention: true,
  tomesd: false,
}

export const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}
