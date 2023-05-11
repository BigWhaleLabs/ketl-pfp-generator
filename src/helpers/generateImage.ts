import generatePrompt from './prompts'
import handleProcessingStatus from './handleProcessingStatus'
import sendImageRequest from './sendImageRequest'

export default async function generateImage(nickname: string) {
  const prompt = generatePrompt(nickname)

  const initialResult = await sendImageRequest({ prompt })

  if (initialResult.data?.status === 'processing') {
    try {
      const finalProcessingResult = await handleProcessingStatus(
        initialResult.data.fetch_result
      )
      console.log('Final processing result', finalProcessingResult)
      return finalProcessingResult
    } catch (error) {
      console.error('Error during processing status handling', error)
      throw error
    }
  }

  if (initialResult.data?.status !== 'success') {
    throw new Error('Error generating image')
  }

  return initialResult.data.output[0]
}
