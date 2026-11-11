import { useFlag } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const ART_ASSISTANT_FLAG = "onyx_art-assistant-web"

export const useEnableArtAssistant = (): boolean => {
  const { user } = useSystemContext()
  const isEnabled = useFlag(ART_ASSISTANT_FLAG)

  return !!user?.id && !!user.accessToken && isEnabled
}
