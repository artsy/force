import { maybeSendErrorToSentry } from "../setupSentry"

describe("setupSentry", () => {
  describe("maybeSendErrorToSentry", () => {
    it("returns true unless error should be ignored", () => {
      const error = { message: "Valid error" }
      expect(maybeSendErrorToSentry(error)).toBeTruthy()
    })

    it("returns false on pktAnnotationHighlighter error", () => {
      const error = {
        message:
          "ReferenceError: Can't find variable: pktAnnotationHighlighter",
      }
      expect(maybeSendErrorToSentry(error)).toBeFalsy()
    })

    it("returns false on facebook cross-origin iframe error", () => {
      const error = {
        message:
          'SecurityError: Blocked a frame with origin "https://www.artsy.net" from accessing a cross-origin frame. Protocols, domains, and ports must match.',
      }
      expect(maybeSendErrorToSentry(error)).toBeFalsy()
    })
  })
})
