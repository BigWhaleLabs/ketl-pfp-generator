import { PromptVariant, prompts } from './configs'

export default function generatePrompt(
  nickname: string,
  variant = PromptVariant.base
) {
  return prompts[variant](nickname)
}
