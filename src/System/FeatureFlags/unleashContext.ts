import type { IMutableContext } from "unleash-proxy-client"

/** The fields both the Node SDK and the Frontend API understand alike */
export type UnleashContext = Pick<
  IMutableContext,
  "userId" | "sessionId" | "properties"
>

interface GetUnleashContextParams {
  user?: User
  sessionId?: string
}

/**
 * The context that flags are evaluated against. The server evaluates flags for
 * the initial render and the browser re-evaluates them via the Frontend API
 * after hydration, so both must build their context here. Otherwise flags
 * targeted on a field only one side sends will flip after the page loads.
 */
export const getUnleashContext = ({
  user,
  sessionId,
}: GetUnleashContextParams): UnleashContext => {
  const roles = user?.roles?.join(",")

  return {
    userId: user?.id,
    sessionId,
    ...(roles ? { properties: { roles } } : {}),
  }
}
