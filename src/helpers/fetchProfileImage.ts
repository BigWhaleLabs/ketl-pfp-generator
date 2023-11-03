import { Readable } from 'stream'
import axios from 'axios'

function arrayBufferToReadableStream(arrayBuffer: ArrayBuffer) {
  return new Readable({
    read() {
      this.push(Buffer.from(arrayBuffer))
      this.push(null)
    },
  })
}

export default async function fetchProfileImage(url: string) {
  const { data } = await axios.get(url, { responseType: 'arraybuffer' })

  console.log('File downloaded:', url)
  // Convert the Blob to a ReadableStream
  return arrayBufferToReadableStream(data)
}
