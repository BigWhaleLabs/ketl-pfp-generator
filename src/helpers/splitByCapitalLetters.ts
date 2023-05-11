export default function (str: string) {
  return str.split(/(?=[A-Z])/).map((s) => s.trim())
}
