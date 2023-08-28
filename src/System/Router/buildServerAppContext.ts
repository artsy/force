import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"

/**
 * Builds initial context for Reaction components from server load. Put commonly
 * required context here.
 *
 * @param req Request passed to Express callback.
 * @param res Response passed to Express callback.
 * @param context Custom data to be added to context (optionally).
 */
export const buildServerAppContext = (
  req: ArtsyRequest,
  res: ArtsyResponse,
  context: { injectedData?: object } = {}
) => {
  return {
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    user: req.user,
    isEigen: req.header("User-Agent")?.match("Artsy-Mobile") != null,
    featureFlags: res.locals.sd.FEATURE_FLAGS,
    userPreferences: res.locals.sd.USER_PREFERENCES,
    ...context,
  }
}
