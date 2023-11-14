import { generateRandomName } from '@big-whale-labs/backend-utils'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
import uploadToIpfs from '../helpers/uploadToIpfs'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class ProfilePicture {
  @prop({ index: true, lowercase: true, required: true, unique: true })
  address!: string
  @prop()
  cid?: string
  @prop({ default: true })
  generating?: boolean
}

export const ProfilePictureModel = getModelForClass(ProfilePicture)

export async function findOrCreateProfilePicture(
  address: string
): Promise<ProfilePicture> {
  let profilePicture = await ProfilePictureModel.findOne({ address })

  if (!profilePicture || (!profilePicture.generating && !profilePicture.cid)) {
    if (!profilePicture) {
      profilePicture = new ProfilePictureModel({ address, generating: true })
    } else {
      profilePicture.generating = true
    }
    await profilePicture.save()

    try {
      const nickname = generateRandomName(address)
      const readableStream = await generateAndDownloadImage(nickname, 3)
      const { cid } = await uploadToIpfs(readableStream)
      profilePicture.cid = cid
    } catch (e) {
      console.error(e)
      throw e
    } finally {
      profilePicture.generating = false
      await profilePicture.save()
    }
  }

  if (profilePicture.generating) {
    await new Promise((res) => setTimeout(res, 5000))
    return findOrCreateProfilePicture(address)
  }

  return profilePicture
}
