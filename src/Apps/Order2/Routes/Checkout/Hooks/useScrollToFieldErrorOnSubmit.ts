import { useFormikContext } from "formik"
import { useEffect, useRef } from "react"

// Recursively flatten nested Formik errors to find first error field name
const getFirstFieldErrorName = (
  errors: any,
  prefix = "",
): string | undefined => {
  for (const key in errors) {
    const value = errors[key]
    const fieldName = prefix ? `${prefix}.${key}` : key

    if (typeof value === "string") {
      // This is an error message, return the field name
      return fieldName
    }

    if (typeof value === "object" && value !== null) {
      // Nested object or array, recurse
      const nestedError = getFirstFieldErrorName(value, fieldName)
      if (nestedError) return nestedError
    }
  }

  return undefined
}

/**
 * Hook that scrolls to the step and focuses the first error field when a Formik form is submitted with errors.
 * Must be called within a Formik form context.
 *
 * @returns A ref to attach to the form container for scoped element queries
 */
export const useScrollToFieldErrorOnSubmit = () => {
  const { submitCount, isValid, errors } = useFormikContext()
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run when form is submitted and invalid
    if (isValid || submitCount === 0) return

    const container = formRef.current

    if (!container) return

    // Find first field error
    const fieldErrorName = getFirstFieldErrorName(errors)

    // Priority 1: Focus first error field if any field errors exist
    if (fieldErrorName) {
      let element: Element | null = null

      // Scroll to step first
      element = document.querySelector(`input[name='${fieldErrorName}']`)

      // Special case for phoneNumberCountryCode
      if (fieldErrorName === "phoneNumberCountryCode") {
        element = document.querySelector(`input[name='phoneNumber']`)
      }

      if (element) {
        // Scroll to first known error into view
        if (typeof element.scrollIntoView === "function") {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
        }

        // Wait for scroll to complete, then focus field
        setTimeout(() => {
          // Query within form container only
          const field =
            container.querySelector(`input[name='${fieldErrorName}']`) ||
            container.querySelector(`textarea[name='${fieldErrorName}']`) ||
            container.querySelector(`select[name='${fieldErrorName}']`)

          if (field && field instanceof HTMLElement) {
            field.focus()
          }
        }, 300) // Wait for scroll animation

        return
      }
    }
  }, [submitCount, isValid, errors])

  return formRef
}
