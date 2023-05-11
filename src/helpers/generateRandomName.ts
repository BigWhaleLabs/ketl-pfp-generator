import { dictionaryConfig } from './configs'
import { uniqueNamesGenerator } from 'unique-names-generator'

export default function (address: string) {
  return uniqueNamesGenerator({ ...dictionaryConfig, seed: address })
}
