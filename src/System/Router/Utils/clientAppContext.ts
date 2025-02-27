// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

export interface ClientContext {
  user: User
  sessionId: string | undefined
}

export const getClientAppContext = (
  context: { injectedData?: object } = {},
): ClientContext => {
  return {
    user: sd.CURRENT_USER,
    sessionId: sd.SESSION_ID,
    ...context,
  }
}
