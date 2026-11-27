// Chrome's translator adds one of these classes to <html> while a page is translated.
const TRANSLATED_CLASSES = ["translated-ltr", "translated-rtl"]

export const isPageTranslated = (): boolean => {
  if (typeof document === "undefined") {
    return false
  }

  const { classList } = document.documentElement

  return TRANSLATED_CLASSES.some(className => {
    return classList.contains(className)
  })
}
