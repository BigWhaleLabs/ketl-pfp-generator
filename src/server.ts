import regenerateOldCids from './helpers/regenerateOldCids'
import runApp from './helpers/runApp'
import runMongo from './helpers/mongo'

void (async () => {
  console.log('Starting mongo')
  await runMongo()
  console.log('Mongo connected')
  await runApp()
  void regenerateOldCids()
})()
