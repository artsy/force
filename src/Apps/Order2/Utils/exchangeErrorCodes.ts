/**
 * `mutationError.code` values Exchange returns from order and offer mutations.
 */

export const PAYMENT_FAILURE_CODES = [
  "capture_failed",
  "charge_authorization_failed",
  "payment_method_confirmation_failed",
  "payment_failed",
]

export const OFFER_UNAVAILABLE_CODES = [
  "invalid_state",
  "not_last_offer",
  "invalid_offer",
  "cannot_accept_offer",
  "cannot_reject_offer",
  "cannot_offer",
  "cannot_update_submitted_offer",
]
