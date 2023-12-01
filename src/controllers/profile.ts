import { Body, Controller, Post } from 'amala'
import { findOrCreateProfilePicture } from '../models/ProfilePicture'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import Address from '../validators/Address'

@Controller('/profile')
export default class ProfilePictureController {
  @Post('/')
  async picGenerator(
    @Body({ required: true })
    { address }: Address
  ) {
    const profilePicture = await findOrCreateProfilePicture(address)
    return {
      cid: profilePicture.resized256Cid || profilePicture.cid,
      original: profilePicture.cid,
      s1024: profilePicture.resized1024Cid,
      s128: profilePicture.resized128Cid,
      s256: profilePicture.resized256Cid,
      s512: profilePicture.resized512Cid,
      username: generateRandomName(address),
    }
  }
}
