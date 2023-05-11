import axios from 'axios'
import env from './env'
import generatePrompt, { negativePromot } from './prompts'

export default async function (nickname: string) {
  const prompt = generatePrompt(nickname)

  const config = {
    enhance_prompt: true,
    height: 512,
    key: env.SD_API_TOKEN,
    model_id: 'anything-v4',
    negative_prompt: negativePromot,
    num_inference_steps: 30,
    prompt,
    safety_checker: true,
    samples: 1,
    width: 512,
  }
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const result = await axios.post(env.SD_API_URI, config, options)
  if (result.data?.status !== 'success') throw new Error('No success!')
  return result.data.output[0]
}
