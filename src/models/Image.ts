import { PromptVariant } from '../helpers/configs'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { maxWaitingTime, tenSeconds } from '../helpers/constants'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import generatePrompt from '../helpers/prompts'
import sleep from '../helpers/sleep'
import uploadToIpfs from '../helpers/uploadToIpfs'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Image {
  @prop({ required: true })
  username!: string
  @prop({ enum: PromptVariant, required: true })
  variant!: PromptVariant
  @prop()
  cid?: string
  @prop({ default: true })
  generating?: boolean
}

export const ImageModel = getModelForClass(Image)

export async function findOrCreateImage(
  username: string,
  promptVariant = PromptVariant.base,
  time = maxWaitingTime
): Promise<Image | null> {
  let image = await ImageModel.findOne({ username, variant: promptVariant })

  if (!image || (!image.generating && !image.cid)) {
    if (!image) {
      image = new ImageModel({
        generating: true,
        username,
        variant: promptVariant,
      })
    } else {
      image.generating = true
    }
    await image.save()

    try {
      const prompt = generatePrompt(username, promptVariant)
      const readableStream = await generateAndDownloadImage(prompt, 3)
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

  if (time <= 0) return null

  if (image.generating) {
    await sleep(tenSeconds)
    return findOrCreateImage(username, promptVariant, time - tenSeconds)
  }

  return image
}
