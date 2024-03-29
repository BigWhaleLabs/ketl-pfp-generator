import {
  checkAndStartGeneratingPictures,
  resetGenerating,
} from '../models/ProfilePicture'

const oneMinute = 60 * 1000

export default async function runProfileGeneratorQueue() {
  await resetGenerating()
  setInterval(async () => {
    try {
      await checkAndStartGeneratingPictures()
    } catch (e) {
      console.error(e)
    }
  }, oneMinute)
}
