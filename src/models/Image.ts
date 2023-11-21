import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import uploadToIpfs from '../helpers/uploadToIpfs'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Image {
  @prop({ index: true, required: true, unique: true })
  username!: string
  @prop()
  cid?: string
  @prop({ default: true })
  generating?: boolean
}

export const ImageModel = getModelForClass(Image)

export async function findOrCreateImage(username: string): Promise<Image> {
  let image = await ImageModel.findOne({ username })

  if (!image || (!image.generating && !image.cid)) {
    if (!image) {
      image = new ImageModel({ generating: true, username })
    } else {
      image.generating = true
    }
    await image.save()

    try {
      const readableStream = await generateAndDownloadImage(username, 3)
      const { cid } = await uploadToIpfs(readableStream)
      image.cid = cid
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      image.generating = false
      await image.save()
    }
  }

  if (image.generating) {
    await new Promise((res) => setTimeout(res, 5000))
    return findOrCreateImage(username)
  }

  return image
}
