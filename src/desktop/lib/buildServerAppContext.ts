import { mediator } from "lib/mediator"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import { getContextPageFromReq } from "lib/getContextPage"

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
    analytics: {
      contextPageOwnerSlug: pageSlug,
      contextPageOwnerType: pageType,
    },
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    isEigen: res.locals.sd.EIGEN,
    mediator,
    user: req.user && req.user.toJSON(),
    ...context,
  }
}
