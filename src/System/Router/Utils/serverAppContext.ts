import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

export const getServerAppContext = (
  req: ArtsyRequest,
  res: ArtsyResponse,
  context: { injectedData?: object } = {}
) => {
  return {
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    user: req.user,
    isEigen: req.header("User-Agent")?.match("Artsy-Mobile") != null,
    isMobile: res.locals.sd.IS_MOBILE,
    featureFlags: res.locals.sd.FEATURE_FLAGS,
    userPreferences: res.locals.sd.USER_PREFERENCES,
    ...context,
  }
}
