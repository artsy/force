import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

export const getServerAppContext = (
  req: ArtsyRequest,
  res: ArtsyResponse,
  context: { injectedData?: object } = {},
) => {
  return {
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    user: req.user,
    isEigen: req.header("User-Agent")?.match("Artsy-Mobile") != null,
    sessionId: res.locals.sd.SESSION_ID,
    userPreferences: res.locals.sd.USER_PREFERENCES,
    ...context,
  }
}
