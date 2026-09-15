import { getENV } from "Utils/getENV"

export const isAIAgentDebugEnabled = (): boolean => {
  return getENV("ENABLE_AI_AGENT_DEBUG") === true
}
