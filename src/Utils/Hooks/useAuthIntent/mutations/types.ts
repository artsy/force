import type { Environment } from "react-relay"

// TODO: Replace with `useMutation`
export type AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  secondaryId?: string | null | undefined,
  featureFlags?: { isEnabled: (flag: string) => boolean },
) => Promise<unknown>
