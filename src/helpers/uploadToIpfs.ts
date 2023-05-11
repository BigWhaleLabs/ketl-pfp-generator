import { Readable } from 'stream'
import { v4 } from 'uuid'
import FormData from 'form-data'
import axios from 'axios'
import env from './env'

export default async function (url: string) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const data = response.data

    // Convert the Blob to a ReadableStream
    const readableStream = arrayBufferToReadableStream(data)

    // Send the downloaded file to the server using a POST request with FormData
    const formData = new FormData()
    const filename = `${v4()}.png`
    formData.append('file', readableStream, filename)

    const uploadResponse = await axios.post(env.IPFS_UPLOADER, formData, {
      headers: formData.getHeaders(),
    })

    console.log('File uploaded:', uploadResponse.data)
    return uploadResponse.data
  } catch (err) {
    console.error(err)
    throw err
  }
}

function arrayBufferToReadableStream(arrayBuffer: ArrayBuffer): Readable {
  const readableStream = new Readable({
    read() {
      this.push(Buffer.from(arrayBuffer))
      this.push(null)
    },
  })
  return readableStream
}
