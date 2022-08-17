import { mediator } from "Server/mediator"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { getContextPageFromReq } from "Server/getContextPage"

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
  const { pageType, pageSlug } = getContextPageFromReq(req)
  return {
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    user: req.user,
    isEigen: req.header("User-Agent")?.match("Artsy-Mobile") != null,
    mediator,
    analytics: {
      contextPageOwnerType: pageType,
      contextPageOwnerSlug: pageSlug,
    },
    featureFlags: res.locals.sd.FEATURE_FLAGS,
    userPreferences: res.locals.sd.USER_PREFERENCES,
    ...context,
  }
}
