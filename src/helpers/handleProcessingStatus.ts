import { baseConfig, httpOptions } from './configs'
import axios from 'axios'
import delay from './delay'

export default async function handleProcessingStatus(
  processingUri: string
): Promise<string> {
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
