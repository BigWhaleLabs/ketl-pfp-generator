import { Readable } from 'stream'
import { v4 } from 'uuid'
import FormData from 'form-data'
import axios from 'axios'
import env from './env'

export default async function (url: string) {
  try {
    const response = await fetch(url)

    if (response.ok) {
      const blob = await response.blob()

      // Convert the Blob to a ReadableStream
      const readableStream = blobToReadableStream(blob)

      // Send the downloaded file to the server using a POST request with FormData
      const formData = new FormData()
      const filename = `${v4()}.png`
      formData.append('file', readableStream, filename)

      const uploadResponse = await axios.post(env.IPFS_UPLOADER, formData, {
        headers: formData.getHeaders(),
      })

      console.log('File uploaded:', uploadResponse.data)
      return uploadResponse.data
    } else {
      console.error(
        `Error downloading file: ${response.status} ${response.statusText}`
      )
      throw new Error(response.statusText)
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}

function blobToReadableStream(blob: Blob): Readable {
  const reader = blob.stream().getReader()
  return new Readable({
    async read() {
      const { done, value } = await reader.read()
      if (done) {
        this.push(null)
      } else {
        this.push(Buffer.from(value))
      }
    },
  })
}
