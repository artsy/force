import { Environment } from "relay-runtime"

export type AuthIntentMutation = (
  relayEnvironment: Environment,
  id: string,
  isFollowed?: boolean
) => Promise<unknown>
