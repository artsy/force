import { useFormikContext } from "formik"
import { useEffect } from "react"

const getFirstFieldErrorName = errors => {
  if (Object.keys(errors).length === 0) return

  const prefix = Object.keys(errors)[0]

  const field = prefix && Object.keys(errors[prefix])[0]

  return `${prefix}.${field}`
}

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext()

  useEffect(() => {
    if (isValid) return

    const fieldErrorName = getFirstFieldErrorName(errors)

    if (typeof fieldErrorName === "undefined") return

    const field = document.querySelector(`input[name='${fieldErrorName}']`)

    if (!field) return

    field.scrollIntoView({ behavior: "smooth", block: "center" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount])

  return null
}
