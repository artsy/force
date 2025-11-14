import { captureException } from "@sentry/browser"
import { ErrorWithMetadata, reportErrorWithScope } from "Utils/errors"

jest.mock("@sentry/browser")

describe("errors", () => {
  describe("#reportError", () => {
    const err = new Error("some error")
    const errWithMetadata = new ErrorWithMetadata("some message", {
      foo: "bar",
    })
    let scope

    beforeEach(() => {
      scope = { setExtra: jest.fn() }
    })

    it("does not call setExtra on scope if the error has no metadata", () => {
      reportErrorWithScope(err)(scope)
      expect(scope.setExtra).not.toBeCalled()
    })

    it("calls setExtra on scope for errors with metadata", () => {
      reportErrorWithScope(errWithMetadata)(scope)
      expect(scope.setExtra).toBeCalledWith("foo", "bar")
    })

    it("sends the error to Sentry", () => {
      reportErrorWithScope(errWithMetadata)(scope)
      expect(captureException).toBeCalledWith(err)
    })
  })
})
