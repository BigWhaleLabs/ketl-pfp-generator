export default function (milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
