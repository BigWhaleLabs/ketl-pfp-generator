import {
  DocumentType,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import { maxWaitingTime, tenSeconds } from '../helpers/constants'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import generatePrompt from '../helpers/prompts'
import sleep from '../helpers/sleep'
import uploadToIpfs from '../helpers/uploadToIpfs'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class ProfilePicture {
  @prop({ index: true, lowercase: true, required: true, unique: true })
  address!: string
  @prop()
  cid?: string
  @prop()
  oldCid?: string
  @prop({ default: true })
  generating?: boolean
  @prop()
  username?: string
}

export const ProfilePictureModel = getModelForClass(ProfilePicture)

export async function regenerateProfileImage(
  profilePicture: DocumentType<ProfilePicture>
) {
  try {
    const nickname = generateRandomName(profilePicture.address)
    const prompt = generatePrompt(nickname)
    const readableStream = await generateAndDownloadImage(prompt, 3)
    const { cid } = await uploadToIpfs(readableStream)
    profilePicture.cid = cid
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    profilePicture.generating = false
    await profilePicture.save()
  }

  return profilePicture
}

export async function findOrCreateProfilePicture(
  address: string,
  time = maxWaitingTime
): Promise<ProfilePicture | null> {
  let profilePicture = await ProfilePictureModel.findOne({ address })

  if (!profilePicture || (!profilePicture.generating && !profilePicture.cid)) {
    if (!profilePicture) {
      profilePicture = new ProfilePictureModel({ address, generating: true })
    } else {
      profilePicture.generating = true
    }
    await profilePicture.save()

    try {
      const nickname = generateRandomName(profilePicture.address)
      const prompt = generatePrompt(nickname)
      const readableStream = await generateAndDownloadImage(prompt, 3)
      const { cid } = await uploadToIpfs(readableStream)
      profilePicture.cid = cid
      profilePicture.username = nickname
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      profilePicture.generating = false
      await profilePicture.save()
    }
  }

  if (time <= 0) return null

  if (profilePicture.generating) {
    await sleep(tenSeconds)
    return findOrCreateProfilePicture(address, time - tenSeconds)
  }

  return profilePicture
}
