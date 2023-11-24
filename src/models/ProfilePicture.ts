import { FindOrCreate } from './FindOrCreate'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import { getModelForClass, prop } from '@typegoose/typegoose'
import delay from '../helpers/delay'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import uploadToIpfs from '../helpers/uploadToIpfs'

export class ProfilePicture extends FindOrCreate {
  @prop({ index: true, required: true, unique: true })
  address!: string
  @prop()
  cid?: string
  @prop({ default: false })
  isFinished?: boolean
  @prop({ default: false })
  generating?: boolean
}

export const ProfilePictureModel = getModelForClass(ProfilePicture)

export async function findOrCreateProfilePicture(
  address: string
): Promise<ProfilePicture> {
  const profilePictureResult = await ProfilePictureModel.findOrCreate({
    address,
  })
  const oldProfilePicture = await ProfilePictureModel.findOne({
    address: address.toLowerCase(),
  })

  const profilePicture = profilePictureResult.doc

  if (profilePicture.cid) return profilePicture

  if (oldProfilePicture) return oldProfilePicture

  await delay(5000)

  return findOrCreateProfilePicture(address)
}

export async function generateImage(address: string) {
  const picture = await ProfilePictureModel.findOne({ address })

  if (!picture) return null
  if (picture.generating) return picture

  try {
    picture.generating = true
    await picture.save()
    const nickname = generateRandomName(address)
    const readableStream = await generateAndDownloadImage(nickname, 3)
    const { cid } = await uploadToIpfs(readableStream)
    picture.cid = cid
    picture.isFinished = true
    await picture.save()
  } catch (e) {
    console.error(e)
  } finally {
    picture.generating = false
    await picture.save()
  }

  return picture
}

export async function checkAndStartGeneratingPictures(limit = 10) {
  const profilePictures = await ProfilePictureModel.find({
    isFinished: false,
  }).limit(limit)

  return Promise.all(profilePictures.map((pfp) => generateImage(pfp.address)))
}

export function resetGenerating() {
  return ProfilePictureModel.updateMany(
    { $or: [{ generating: true }, { cid: undefined }] },
    { $set: { generating: false, isFinished: false } }
  )
}
