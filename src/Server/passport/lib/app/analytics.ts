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

    const analyticsContext: Record<string, string> = {}
    if (req.session.contextModule)
      analyticsContext.contextModule = req.session.contextModule as string
    if (req.session.sign_up_intent)
      analyticsContext.intent = req.session.sign_up_intent as string
    if (!isOneTap && req.session.trigger)
      analyticsContext.trigger = req.session.trigger as string

    const hasContext = Object.keys(analyticsContext).length > 0

    res.cookie(
      SOCIAL_AUTH_TRACKING_COOKIE,
      JSON.stringify({
        action,
        service: cookieService,
        ...(isOneTap ? { trigger: "one-tap" } : {}),
        ...(hasContext ? { analytics: analyticsContext } : {}),
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
