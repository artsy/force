import type { NextFunction } from "express"
import type { PassportRequest, PassportResponse } from "../types"

const SOCIAL_AUTH_TRACKING_COOKIE = "useSocialAuthTracking"

type SocialService = "apple" | "facebook" | "google" | "google-one-tap"

export const setAuthTrackingCookie =
  (service: SocialService) =>
  (req: PassportRequest, res: PassportResponse, next: NextFunction) => {
    const action = req.artsyPassportSignedUp ? "signedUp" : "loggedIn"
    const isOneTap = service === "google-one-tap"
    const cookieService = isOneTap ? "google" : service

    let contextPagePath: string | undefined
    if (isOneTap) {
      const referer = req.headers?.referer
      if (referer) {
        try {
          contextPagePath = new URL(referer).pathname
        } catch {
          // malformed referer — omit
        }
      }
    }

    res.cookie(
      SOCIAL_AUTH_TRACKING_COOKIE,
      JSON.stringify({
        action,
        service: cookieService,
        ...(isOneTap ? { trigger: "tap" } : {}),
        ...(contextPagePath ? { context_page_path: contextPagePath } : {}),
      }),
      { httpOnly: false },
    )

    next()
  }

export const setCampaign = (
  req: PassportRequest,
  _res: PassportResponse,
  next: NextFunction,
) => {
  req.session.modalId = req.body.modal_id || req.query.modal_id
  req.session.acquisitionInitiative =
    req.body.acquisition_initiative || req.query.acquisition_initiative

  next()
}
