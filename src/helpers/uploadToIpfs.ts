import { Readable } from 'stream'
import { v4 } from 'uuid'
import FormData from 'form-data'
import axios from 'axios'
import env from './env'

export default async function (readableStream: Readable) {
  try {
    // Send the downloaded file to the server using a POST request with FormData
    const formData = new FormData()
    const filename = `${v4()}.png`
    formData.append('file', readableStream, filename)

    const { data: uploadData } = await axios.post(env.IPFS_UPLOADER, formData, {
      headers: formData.getHeaders(),
    })

    console.log('File uploaded:', uploadData)
    return uploadData
  } catch (err) {
    console.error(err)
    throw err
  }
}
