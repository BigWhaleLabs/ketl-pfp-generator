import { generateRandomName } from '@big-whale-labs/backend-utils'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
<<<<<<< Updated upstream
import generateImage from '../helpers/generateImage'
=======
import generateAndDownloadImage from '../helpers/generateAndDownloadImage'
>>>>>>> Stashed changes
import uploadToIpfs from '../helpers/uploadToIpfs'

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
    const image = await generateImage(nickname)
    const { cid } = await uploadToIpfs(image)

    profilePicture = new ProfilePictureModel({ address, cid })
    await profilePicture.save()
  }

  return profilePicture
}
