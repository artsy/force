// @ts-ignore
import mediator from "desktop/lib/mediator.coffee"
import { Request, Response } from "express"
import { getPageTypeFromReq } from "lib/getPageType"

/**
 * Builds initial context for Reaction components from server load. Put commonly
 * required context here.
 *
 * @param req Request passed to Express callback.
 * @param res Response passed to Express callback.
 * @param context Custom data to be added to context (optionally).
 */
export const buildServerAppContext = (
  req: Request,
  res: Response,
  context: { injectedData?: object } = {}
) => {
  const { pageType, pageSlug } = getPageTypeFromReq(req)
  return {
    initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
    user: req.user && req.user.toJSON(),
    isEigen: res.locals.sd.EIGEN,
    mediator,
    analytics: {
      contextPageOwnerType: pageType,
      contextPageOwnerSlug: pageSlug,
    },
    ...context,
  }
}
