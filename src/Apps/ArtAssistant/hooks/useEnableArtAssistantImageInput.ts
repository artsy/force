import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

// Same flag Metaphysics checks before accepting a new image, so the button never offers a rejected turn.
export const ART_ASSISTANT_IMAGE_INPUT_FLAG = "onyx_ai_agent-image-input"

export const useEnableArtAssistantImageInput = (): boolean => {
  const { featureFlags } = useSystemContext()
  const isEnabled = useFlag(ART_ASSISTANT_IMAGE_INPUT_FLAG)
  const { flagsReady } = useFlagsStatus()
  return flagsReady
    ? isEnabled
    : !!featureFlags?.isEnabled(ART_ASSISTANT_IMAGE_INPUT_FLAG)
}
