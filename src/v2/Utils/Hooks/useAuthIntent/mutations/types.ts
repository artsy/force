import { Environment } from "relay-runtime"

export type AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string
) => Promise<unknown>
