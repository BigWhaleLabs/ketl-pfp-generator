import { Body, Controller, Params, Post } from 'amala'
import { findOrCreateImage } from '../models/Image'
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
      oldCid: profilePicture.oldCid,
      username: generateRandomName(address),
    }
  }

  @Post('/:username')
  async newPicGenerator(@Params('username') username: string) {
    const profilePicture = await findOrCreateImage(username)
    return {
      cid: profilePicture.cid,
      username,
    }
  }
}
