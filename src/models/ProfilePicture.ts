import { generateRandomName } from '@big-whale-labs/backend-utils'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import generateAndDownloadImage from 'helpers/generateAndDownloadImage'
import uploadToIpfs from 'helpers/uploadToIpfs'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class ProfilePicture {
  @prop({ index: true, lowercase: true, required: true, unique: true })
  address!: string
  @prop({ required: true })
  cid!: string
}

export const ProfilePictureModel = getModelForClass(ProfilePicture)

export async function findOrCreateProfilePicture(address: string) {
  let profilePicture = await ProfilePictureModel.findOne({ address })

  if (!profilePicture) {
    const nickname = generateRandomName(address)
    const readableStream = await generateAndDownloadImage(nickname, 3)
    const { cid } = await uploadToIpfs(readableStream)

    profilePicture = new ProfilePictureModel({ address, cid })
    await profilePicture.save()
  }

  return profilePicture
}
