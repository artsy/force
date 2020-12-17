import { fetchQuery } from "relay-runtime"
import { checkEmail } from "../helpers"

jest.mock("relay-runtime", () => ({ fetchQuery: jest.fn() }))
const mockFetchQuery = fetchQuery as jest.Mock<any>

describe("Authentication Helpers", () => {
  describe("checkEmail", () => {
    it("return true if it should exist and it does exist", done => {
      mockFetchQuery.mockImplementationOnce(() =>
        Promise.resolve({
          user: { userAlreadyExists: true },
        })
      )
      checkEmail({
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        relayEnvironment: null,
        shouldExist: true,
        values: {
          email: "kana@lalamail.com",
        },
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    it("return false if it should exist and it doesnt exist", done => {
      mockFetchQuery.mockImplementationOnce(() =>
        Promise.resolve({
          user: { userAlreadyExists: false },
        })
      )
      checkEmail({
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        relayEnvironment: null,
        shouldExist: true,
        values: {
          email: "kana@lalamail.com",
        },
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })

    it("return true if it shouldnt exist and it doesnt exist", done => {
      mockFetchQuery.mockImplementationOnce(() =>
        Promise.resolve({
          user: { userAlreadyExists: false },
        })
      )
      checkEmail({
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        relayEnvironment: null,
        shouldExist: false,
        values: {
          email: "kana@lalamail.com",
        },
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    it("return false if it shouldnt exist and it does exist", done => {
      mockFetchQuery.mockImplementationOnce(() =>
        Promise.resolve({
          user: { userAlreadyExists: true },
        })
      )
      checkEmail({
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        relayEnvironment: null,
        shouldExist: false,
        values: {
          email: "kana@lalamail.com",
        },
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })

    it("should gracefully handle a missing user object as if it were a missing user", done => {
      mockFetchQuery.mockImplementationOnce(() => Promise.resolve({}))
      checkEmail({
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        relayEnvironment: null,
        shouldExist: true,
        values: {
          email: "kana@lalamail.com",
        },
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })
  })
})
