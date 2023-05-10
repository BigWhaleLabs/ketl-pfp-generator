import { Body, Controller, Post } from 'amala'
import { Readable } from 'stream'
import Address from '../validators/Address'
import FormData from 'form-data'
import axios from 'axios'
import env from '../helpers/env'
import fetch from 'node-fetch'
import generateImage from '../helpers/generateImage'
import generateRandomName from '../helpers/generateRandomName'

@Controller('/profile')
export default class LoginController {
  @Post('/')
  async picGenerator(
    @Body({ required: true })
    { address }: Address
  ) {
    const nickname = generateRandomName(address)
    const image = await generateImage(nickname)
    console.log(image)
    const { cid } = await download(image, Math.random().toString() + '.png')
    return {
      cid,
    }
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

async function download(url: string, filename: string) {
  try {
    const response = await fetch(url)

    if (response.ok) {
      const blob = await response.blob()

      // Convert the Blob to a ReadableStream
      const readableStream = blobToReadableStream(blob)

      // Send the downloaded file to the server using a POST request with FormData
      const formData = new FormData()
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
    }
  } catch (err) {
    console.error(err)
  }
}
