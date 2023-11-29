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
      cid: profilePicture.cid,
      newCid: profilePicture.newCid,
      username: generateRandomName(address),
    }
  }
}
