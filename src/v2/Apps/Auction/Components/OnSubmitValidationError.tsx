import { useFormikContext } from "formik"
import { FC, useEffect } from "react"

import {
  BillingInfoWithBid,
  BillingInfoWithTerms,
} from "v2/Components/BillingInfoFormContext"

export type TrackErrors = (errors: string[]) => void

/*
  This component exists only to capture formik's renderProps and track form
  submission events. It essentially says:
  - IF the form has been submitted at least once
  - AND the form is not submitting at this moment
  - AND the form is invalid
  - AND (in useEffect dependencies array) the form submitting state just
    changed (because it is false, it must have been true above)
  - THEN run the callback prop.
  Background:
    https://github.com/jaredpalmer/formik/issues/1484#issuecomment-490558973
 */

export const OnSubmitValidationError: FC<{ cb: TrackErrors }> = ({ cb }) => {
  const {
    submitCount,
    isSubmitting,
    isValid,
    errors,
    setSubmitting,
  } = useFormikContext<BillingInfoWithTerms | BillingInfoWithBid>()

  useEffect(() => {
    if (submitCount > 0 && !isSubmitting && !isValid) {
      const clonedErrors = Object.assign({}, errors)
      const addressErrors = clonedErrors.address
      delete clonedErrors.address

      const err = Object.assign({}, clonedErrors, addressErrors)
      cb(Object.values(err))
      setSubmitting(false)
    }
  }, [submitCount, isSubmitting])

  return null
}
