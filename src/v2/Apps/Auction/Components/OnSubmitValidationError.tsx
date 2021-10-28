import { useFormikContext } from "formik"
import * as React from "react"

import {
  BillingInfoWithBid,
  BillingInfoWithTerms,
} from "v2/Apps/Auction/Components/Form"

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

export const OnSubmitValidationError: React.FC<{ cb: TrackErrors }> = ({
  cb,
}) => {
  const formikProps = useFormikContext<
    BillingInfoWithTerms | BillingInfoWithBid
  >()

  const effect = () => {
    if (
      formikProps.submitCount > 0 &&
      !formikProps.isSubmitting &&
      !formikProps.isValid
    ) {
      const clonedErrors = Object.assign({}, formikProps.errors)
      const addressErrors = clonedErrors.address
      delete clonedErrors.address

      const errors = Object.assign({}, clonedErrors, addressErrors)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      cb(Object.values(errors as string[]))
      formikProps.setSubmitting(false)
    }
  }
  React.useEffect(effect, [formikProps.submitCount, formikProps.isSubmitting])

  return null
}
