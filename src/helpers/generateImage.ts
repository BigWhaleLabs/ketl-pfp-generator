import axios from 'axios'
import env from './env'
import generatePrompt, { negativePrompt } from './prompts'

const baseConfig = {
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

const httpOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

async function handleProcessingStatus(processingUri: string): Promise<string> {
  await delay(7500)
  const processingResult = await axios.post(
    processingUri,
    baseConfig,
    httpOptions
  )

  if (processingResult.data.status === 'processing') {
    return handleProcessingStatus(processingUri)
  }

  return processingResult.data.output[0]
}

export default async function generateImage(nickname: string) {
  const prompt = generatePrompt(nickname)
  const config = { ...baseConfig, prompt }

  const initialResult = await axios.post(env.SD_API_URI, config, httpOptions)

  if (initialResult.data?.status === 'processing') {
    try {
      const finalProcessingResult = await handleProcessingStatus(
        initialResult.data.fetch_result
      )
      console.log('Final processing result', finalProcessingResult)
      return finalProcessingResult
    } catch (error) {
      console.error('Error during processing status handling', error)
    }
  }

  if (initialResult.data?.status !== 'success') {
    console.error(initialResult.data)
    throw new Error('Error generating image')
  }

  return initialResult.data.output[0]
}
