import runApp from './helpers/runApp'
import runMongo from './helpers/mongo'
import runProfileGeneratorQueue from './helpers/runProfileGeneratorQueue'

void (async () => {
  console.log('Starting mongo')
  await runMongo()
  console.log('Mongo connected')
  await runApp()
  void runProfileGeneratorQueue()
})()
