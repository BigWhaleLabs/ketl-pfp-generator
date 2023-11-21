export default function sleep(time = 5000) {
  return new Promise((res) => setTimeout(res, time))
}
