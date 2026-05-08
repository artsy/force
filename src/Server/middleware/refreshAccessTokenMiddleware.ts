import type { NextFunction, Request, Response } from "express"
import {
  ACCESS_TOKEN_REFRESH_ENABLED,
  ACCESS_TOKEN_REFRESH_THRESHOLD_SECONDS,
} from "Server/config"
import createLogger from "Utils/logger"
import {
  refreshAccessToken,
  shouldRefresh,
} from "Server/passport/lib/refreshAccessToken"
import forwardedFor from "Server/passport/lib/app/forwarded_for"

const logger = createLogger("Server/middleware/refreshAccessTokenMiddleware")

const inFlight = new Map<string, Promise<string | null>>()

const SKIPPED_PATH_PREFIXES = ["/assets/", "/health", "/favicon"]

export const refreshAccessTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!ACCESS_TOKEN_REFRESH_ENABLED) return next()
    if (req.method === "OPTIONS") return next()
    if (SKIPPED_PATH_PREFIXES.some(p => req.path.startsWith(p))) return next()

    const user = (req as any).user
    const currentToken: string | undefined = user?.accessToken
    const userId: string | undefined = user?.id

    if (!currentToken || !userId) return next()

    const now = Math.floor(Date.now() / 1000)
    if (
      !shouldRefresh(currentToken, now, ACCESS_TOKEN_REFRESH_THRESHOLD_SECONDS)
    ) {
      return next()
    }

    let pending = inFlight.get(userId)
    if (!pending) {
      pending = (async () => {
        const result = await refreshAccessToken(currentToken, forwardedFor(req))
        if (result.ok) return result.accessToken
        if (result.reason === "invalid") return ""
        return null
      })().finally(() => {
        inFlight.delete(userId)
      })
      inFlight.set(userId, pending)
    }

    const newToken = await pending

    if (newToken === null) {
      // Transient failure — keep current token, continue.
      logger.warn("token refresh failed (transient); keeping current token")
      return next()
    }

    if (newToken === "") {
      // Invalid token — log user out and continue.
      const reqAny = req as any
      if (typeof reqAny.logout === "function") {
        return reqAny.logout(() => next())
      }
      reqAny.user = null
      if (reqAny.session) reqAny.session = null
      return next()
    }

    user.accessToken = newToken
    const sessionUser = (req as any).session?.passport?.user
    if (sessionUser) {
      sessionUser.accessToken = newToken
    }
    return next()
  } catch (err) {
    logger.error("unexpected error in refreshAccessTokenMiddleware", err)
    return next()
  }
}
