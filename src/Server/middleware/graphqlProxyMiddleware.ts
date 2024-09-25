import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import { METAPHYSICS_ENDPOINT } from "Server/config"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { NextFunction } from "express"

export const graphqlProxyMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  return createProxyMiddleware({
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      // Fix proxy incompatability with express.js body-parser middleware
      proxyReq: fixRequestBody,
    },
  })(req, res, next)
}
