import { isPageTranslated } from "System/Utils/isPageTranslated"

describe("isPageTranslated", () => {
  afterEach(() => {
    document.documentElement.className = ""
  })

  it("is false on an untranslated page", () => {
    expect(isPageTranslated()).toBe(false)
  })

  it.each(["translated-ltr", "translated-rtl"])(
    "is true when <html> has %s",
    className => {
      document.documentElement.classList.add(className)

      expect(isPageTranslated()).toBe(true)
    },
  )
})
