// @ts-ignore
import mediator from "desktop/lib/mediator.coffee"
import { Request as ExpressRequest, Response as ExpressResponse } from "express"

interface Request extends ExpressRequest {
  user: any
}
type Response = ExpressResponse

/**
 * Builds initial context for Reaction components from server load. Put commonly
 * required context here.
 *
 * @param req Request passed to Express callback.
 * @param res Response passed to Express callback.
 */
export const buildServerAppContext = (req: Request, res: Response) => ({
  initialMatchingMediaQueries: res.locals.sd.IS_MOBILE ? ["xs"] : undefined,
  user: req.user && req.user.toJSON(),
  isEigen: res.locals.sd.EIGEN,
  mediator,
})
