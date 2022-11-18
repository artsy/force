import { Environment } from "relay-runtime"

// TODO: Replace with `useMutation`
export type AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => Promise<unknown>
