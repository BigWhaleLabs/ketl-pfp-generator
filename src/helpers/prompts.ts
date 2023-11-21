import { PromptVariant, prompts } from './configs'

export default function generatePrompt(
  nickname: string,
  variant = PromptVariant.base
) {
  console.log(variant)
  return prompts[variant](nickname)
}
