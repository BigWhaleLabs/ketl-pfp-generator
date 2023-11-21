import { Body, Controller, Ctx, Params, Post } from 'amala'
import { Context } from 'koa'
import { PromptVariant } from '../helpers/configs'
import { findOrCreateImage } from '../models/Image'
import { findOrCreateProfilePicture } from '../models/ProfilePicture'
import { generateRandomName } from '@big-whale-labs/backend-utils'
import { notFound } from '@hapi/boom'
import Address from '../validators/Address'

@Controller('/profile')
export default class ProfilePictureController {
  @Post('/')
  async picGenerator(
    @Body({ required: true })
    { address }: Address,
    @Ctx() ctx: Context
  ) {
    const profilePicture = await findOrCreateProfilePicture(address)

    if (!profilePicture) ctx.throw(notFound())

    return {
      cid: profilePicture.cid,
      oldCid: profilePicture.oldCid,
      username: generateRandomName(address),
    }
  }

  @Post('/:username/:variant')
  async newPicGenerator(
    @Params('username') username: string,
    @Params('variant') variant: PromptVariant,
    @Ctx() ctx: Context
  ) {
    const profilePicture = await findOrCreateImage(username, variant)

    if (!profilePicture) ctx.throw(notFound())

    return {
      cid: profilePicture.cid,
      username,
    }
  }
}
