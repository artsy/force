import * as React from "react"
import { useEffect } from "react"
import { useFormContext } from "v2/Apps/Auction2/Hooks/useFormContext"

/*
  NOTE: Feb 2022: Not sure what this does or why

  Old Comment:
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

export const OnSubmitValidationError: React.FC<{
  onError: (errors: string[]) => void
}> = props => {
  const {
    errors,
    isSubmitting,
    isValid,
    setSubmitting,
    submitCount,
  } = useFormContext()

  const { onError } = props

  useEffect(() => {
    if (submitCount > 0 && isSubmitting && !isValid) {
      const clonedErrors = Object.assign({}, errors)
      const addressErrors = clonedErrors.address
      delete clonedErrors.address

      const formErrors = Object.assign({}, clonedErrors, addressErrors)

      // @ts-ignore // yolo
      onError(Object.values(formErrors))
      setSubmitting!(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount, isSubmitting])

  return null
}
