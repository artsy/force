import { submissionError } from "./actions"

export const numberWarning = value =>
  value && isNaN(Number(value)) && "Must be a number"

export const dispatchAndScrollToError = (errors, dispatch) => {
  dispatch(submissionError("validation"))
  scrollToError(errors)
}

export const scrollToError = errors => {
  const scrollBuffer = 5
  const firstError = Object.keys(errors)[0]
  const firstErrorElement = document.getElementsByName(firstError)[0]
  if (firstErrorElement) {
    window.scrollTo(0, firstErrorElement.offsetTop - scrollBuffer)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    firstErrorElement.querySelector("input").focus()
  }
}

export function validate(values) {
  const {
    depth,
    edition,
    edition_number,
    edition_size,
    height,
    location,
    medium,
    phone,
    title,
    width,
    year,
  } = values
  const errors: any = {}

  // The order of these errors are important, as it determines which field to scroll to
  // when there is an error on submission.
  if (!title) errors.title = "Required"
  if (!year) errors.year = "Required"
  if (!medium) errors.medium = "Required"
  if (!phone) errors.phone = "Required"
  if (!height || numberWarning(height)) errors.height = "Required"
  if (!width || numberWarning(width)) errors.width = "Required"
  if (numberWarning(depth)) errors.depth = "Required"
  if (edition) {
    if (!edition_number) errors.edition_number = "Required"
    if (!edition_size) errors.edition_size = "Required"
  }
  if (!location) errors.location = "Required"

  return errors
}
