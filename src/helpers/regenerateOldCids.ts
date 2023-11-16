import {
  ProfilePictureModel,
  regenerateProfileImage,
} from '../models/ProfilePicture'

export default async function regenerateOldCids() {
  const profiles = await ProfilePictureModel.find({ oldCid: { $exists: true } })

  for (const profile of profiles) {
    try {
      console.log(
        `Regenerate the pfp for ${profile.address} cid: ${profile.cid}`
      )
      const result = await regenerateProfileImage(profile)
      console.log(
        `Regenerated the pfp for ${result.address}, oldCid: ${result.oldCid} ⇒ cid: ${result.cid}`
      )
    } catch (e) {
      console.error(e)
    }
  }
}
