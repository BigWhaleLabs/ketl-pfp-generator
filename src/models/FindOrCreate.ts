import * as mongoose from 'mongoose'
import { DocumentType, plugin } from '@typegoose/typegoose'
import findorcreate from 'mongoose-findorcreate'

export interface FindOrCreateResult<T> {
  created: boolean
  doc: DocumentType<T>
}

@plugin(findorcreate)
export abstract class FindOrCreate {
  public static findOrCreate: <T extends FindOrCreate>(
    this: mongoose.Model<T>,
    condition: mongoose.FilterQuery<T>,
    createWith?: unknown
  ) => Promise<FindOrCreateResult<T>>
}
