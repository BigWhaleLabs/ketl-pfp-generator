import axios from "axios"
import env from "./env"
import generatePrompt, { negativePromot } from "./prompts"

export default async function(nickname: string) {
    const prompt = generatePrompt(nickname)

    const config = {
        key: env.SD_API_TOKEN,
        prompt,
        width: 512,
        height: 512,
        samples: 1,
        num_inference_steps: 30,
        safety_checker: true,
        enhance_prompt: true,
        model_id: 'anything-v4',
        negative_prompt: negativePromot,
      }
      const options = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const result = await axios.post(env.SD_API_URI, config, options)
      return result.data.output[0]
}