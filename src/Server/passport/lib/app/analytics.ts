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

    res.cookie(
      SOCIAL_AUTH_TRACKING_COOKIE,
      JSON.stringify({
        action,
        service: cookieService,
        ...(isOneTap ? { trigger: "one-tap" } : {}),
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
