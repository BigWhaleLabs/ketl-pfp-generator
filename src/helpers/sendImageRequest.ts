import OpenAI from 'openai'
import env from './env'

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY })

export default async function ({ prompt }: { prompt: string }) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    n: 1,
    prompt,
    size: '1024x1024',
  })

  return response.data[0].url
}
