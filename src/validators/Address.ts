import { IsEthereumAddress } from 'amala'

export default class FacebookLogin {
  @IsEthereumAddress()
  address!: string
}
