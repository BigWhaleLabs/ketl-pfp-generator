import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'
import { Server } from 'http'
import runApp from '../helpers/runApp'
import runMongo from '../helpers/mongo'
import shutdown from 'http-graceful-shutdown'

describe('Login endpoint', () => {
  let server: Server
  let mongoServer: MongoMemoryServer
  let mongoose: Mongoose

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose = await runMongo(await mongoServer.getUri())
    server = await runApp()
  })

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase()
  })

  afterAll(async () => {
    await shutdown(server)
    await mongoServer.stop()
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        err ? reject(err) : resolve()
      })
    })
  })
})
