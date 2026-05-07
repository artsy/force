import type { NextFunction } from "express"
import type { PassportRequest, PassportResponse } from "../types"

import Analytics from "analytics-node"
import { data as sd } from "sharify"

export const analytics = sd.SEGMENT_WRITE_KEY
  ? new Analytics(sd.SEGMENT_WRITE_KEY)
  : null

export const setCampaign = (
  req: PassportRequest,
  _res: PassportResponse,
  next: NextFunction,
) => {
  if (!sd.SEGMENT_WRITE_KEY) {
    return next()
  }

  req.session.modalId = req.body.modal_id || req.query.modal_id
  req.session.acquisitionInitiative =
    req.body.acquisition_initiative || req.query.acquisition_initiative

  next()
}

export const trackSignup =
  (service: string) =>
  (req: PassportRequest, _res: PassportResponse, next: NextFunction) => {
    const { acquisitionInitiative, modalId } = req.session

    delete req.session.acquisitionInitiative
    delete req.session.modalId

    if (!sd.SEGMENT_WRITE_KEY) {
      return next()
    }

    analytics?.track({
      event: "Created account",
      userId: req.user!.id,
      properties: {
        modal_id: modalId,
        acquisition_initiative: acquisitionInitiative,
        signup_service: service,
        user_id: req.user!.id,
      },
    })

    next()
  }

export const trackLogin = (
  req: PassportRequest,
  _res: PassportResponse,
  next: NextFunction,
) => {
  if (!sd.SEGMENT_WRITE_KEY) {
    return next()
  }

  analytics?.track({
    event: "Successfully logged in",
    userId: req.user!.id,
  })

  next()
}
