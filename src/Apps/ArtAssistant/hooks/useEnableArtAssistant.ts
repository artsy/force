import { useFlag, useFlagsStatus } from "@unleash/proxy-client-react"
import { useSystemContext } from "System/Hooks/useSystemContext"

// Target this flag by user ID. The server SDK, the client singleton (which also sends `roles`)
// and `FeatureFlagProvider` each evaluate it with a different context, and only `userId` is
// common to all three.
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

// For entry points rendered on every page. Only the Art Assistant route waits for the client
// Unleash singleton before hydrating, so elsewhere it can still be empty and disagree with SSR.
// Waiting for the provider keeps the server and first client render both hidden.
export const useIsArtAssistantLinkEnabled = (): boolean => {
  const { user } = useSystemContext()
  const isEnabled = useFlag(ART_ASSISTANT_FLAG)
  const { flagsReady } = useFlagsStatus()
  return !!user?.id && !!user.accessToken && flagsReady && isEnabled
}
