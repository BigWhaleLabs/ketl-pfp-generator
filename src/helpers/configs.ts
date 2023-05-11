import { negativePrompt } from './prompts'
import env from './env'

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
