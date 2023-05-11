import generatePrompt from './prompts'
import handleProcessingStatus from './handleProcessingStatus'
import sendImageRequest from './sendImageRequest'

export default async function generateImage(nickname: string) {
  const prompt = generatePrompt(nickname)

  const initialResultData = (await sendImageRequest({ prompt })).data

  if (initialResultData?.status === 'processing') {
    try {
      const finalProcessingResult = await handleProcessingStatus(
        initialResultData?.fetch_result
      )
      console.log('Final processing result', finalProcessingResult)
      return finalProcessingResult
    } catch (error) {
      console.error('Error during processing status handling', error)
      throw error
    }
  }

  if (initialResultData?.status !== 'success') {
    throw new Error('Error generating image')
  }

  return initialResultData.output[0]
}
