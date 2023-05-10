import { Config, uniqueNamesGenerator } from 'unique-names-generator'
import { animalDictionary, colorDictionary } from '../helpers/nameDictionary'

export default function (address: string) {
  const customConfig: Config = {
    dictionaries: [animalDictionary, colorDictionary],
    length: 2,
    seed: address,
    separator: '',
    style: 'capital',
  }
  return uniqueNamesGenerator(customConfig)
}
