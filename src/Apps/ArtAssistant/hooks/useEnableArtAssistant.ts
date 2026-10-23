import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

export const ART_ASSISTANT_FLAG = "onyx_art-assistant-web"

export const useEnableArtAssistant = (): boolean => {
  const { user, featureFlags } = useSystemContext()
  const isEnabled = useFlag(ART_ASSISTANT_FLAG)
  const { flagsReady } = useFlagsStatus()
  // Use the router's resolved flag during SSR and the provider's first hydration pass.
  return (
    !!user?.id &&
    !!user.accessToken &&
    (flagsReady ? isEnabled : !!featureFlags?.isEnabled(ART_ASSISTANT_FLAG))
  )
}
