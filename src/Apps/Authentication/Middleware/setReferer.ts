import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"

export const setReferer = ({
  req,
  res,
}: {
  req: ArtsyRequest
  res: ArtsyResponse
}) => {
  res.locals.sd.AUTHENTICATION_REFERER = req.header("Referer") || req.hostname
  return { req, res }
}
