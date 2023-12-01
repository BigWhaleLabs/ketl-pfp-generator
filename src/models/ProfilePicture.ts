import { FindOrCreate } from './FindOrCreate'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import { getModelForClass, prop } from '@typegoose/typegoose'
import delay from '../helpers/delay'
import env from '../helpers/env'
import fetchProfileImage from '../helpers/fetchProfileImage'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import resizeImage from '../helpers/resizeImage'
import uploadToIpfs from '../helpers/uploadToIpfs'

export class ProfilePicture extends FindOrCreate {
  @prop({ index: true, required: true, unique: true })
  address!: string
  @prop()
  cid?: string
  @prop()
  resized512Cid?: string
  @prop({ default: false })
  isFinished?: boolean
  @prop({ default: false })
  generating?: boolean
  @prop({ default: false })
  resizing?: boolean
}

export const ProfilePictureModel = getModelForClass(ProfilePicture)

export async function findOrCreateProfilePicture(
  address: string
): Promise<ProfilePicture> {
  const profilePictureResult = await ProfilePictureModel.findOrCreate({
    address,
  })
  const profilePicture = profilePictureResult.doc
  if (profilePicture.cid) return profilePicture

  await delay(5000)

  return findOrCreateProfilePicture(address)
}

export async function generateImage(address: string) {
  const picture = await ProfilePictureModel.findOne({ address })

  if (!picture) return null
  if (picture.generating) return picture

  try {
    picture.generating = true
    picture.resizing = true
    await picture.save()
    const nickname = generateRandomName(address)
    const buffer = await generateAndDownloadImage(nickname, 3)
    const { cid } = await uploadToIpfs(buffer)
    picture.cid = cid
    const resized = await resizeImage(buffer, 512, 512)
    const { cid: resizedCid } = await uploadToIpfs(resized)
    picture.resized512Cid = resizedCid
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

export async function checkAndStartGeneratingPictures(limit = 5) {
  const profilePictures = await ProfilePictureModel.find({
    isFinished: false,
  }).limit(limit)

  return Promise.all(profilePictures.map((pfp) => generateImage(pfp.address)))
}

export async function resizeProfileImage(address: string) {
  const picture = await ProfilePictureModel.findOne({ address })

  if (!picture) return null
  if (picture.resizing) return picture

  try {
    picture.resizing = true
    await picture.save()
    const buffer = await fetchProfileImage(
      `${env.IPFS_UPLOADER}/ipfs/${picture.cid}`
    )
    const resized = await resizeImage(buffer, 512, 512)
    const { cid: resizedCid } = await uploadToIpfs(resized)
    picture.resized512Cid = resizedCid
    picture.resizing = false

    await picture.save()
  } catch (e) {
    console.error(e)
  } finally {
    picture.resizing = false
    await picture.save()
  }

  return picture
}

export async function checkAndResizePictures(limit = 20) {
  const profilePictures = await ProfilePictureModel.find({
    resized512Cid: { $exists: false },
  }).limit(limit)

  return Promise.all(
    profilePictures.map((pfp) => resizeProfileImage(pfp.address))
  )
}

export async function resetGenerating() {
  await ProfilePictureModel.updateMany(
    { $or: [{ generating: true }, { cid: undefined }] },
    { $set: { generating: false, isFinished: false, resizing: false } }
  )

  await ProfilePictureModel.updateMany(
    { resizing: true },
    { $set: { resizing: false } }
  )
}
