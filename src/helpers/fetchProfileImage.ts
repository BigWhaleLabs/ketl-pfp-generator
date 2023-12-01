import { Readable } from 'stream'
import axios from 'axios'

export function arrayBufferToReadableStream(buffer: Buffer) {
  return new Readable({
    read() {
      this.push(buffer)
      this.push(null)
    },
  })
}

export default async function fetchProfileImage(url: string) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' })

  console.log('File downloaded:', url)
  // Convert the Blob to a ReadableStream
  return Buffer.from(data)
}
