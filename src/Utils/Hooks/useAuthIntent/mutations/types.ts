import { Environment } from "react-relay"

// TODO: Replace with `useMutation`
export type AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  secondaryId?: string | null | undefined
) => Promise<unknown>
