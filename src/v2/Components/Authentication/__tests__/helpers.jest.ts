import { fetchQuery } from "relay-runtime"
import { checkEmail } from "../helpers"

jest.mock("relay-runtime", () => ({ fetchQuery: jest.fn() }))
const mockFetchQuery = fetchQuery as jest.Mock<any>

describe("Authentication Helpers", () => {
  describe("checkEmail", () => {
    // eslint-disable-next-line jest/no-done-callback
    it("return true if it should exist and it does exist", done => {
      mockFetchQuery.mockImplementationOnce(() => ({
        toPromise: () =>
          Promise.resolve({
            user: { userAlreadyExists: true },
          }),
      }))
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: true,
        relayEnvironment: null,
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    // eslint-disable-next-line jest/no-done-callback
    it("return false if it should exist and it doesnt exist", done => {
      mockFetchQuery.mockImplementationOnce(() => ({
        toPromise: () =>
          Promise.resolve({
            user: { userAlreadyExists: false },
          }),
      }))
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: true,
        relayEnvironment: null,
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })

    // eslint-disable-next-line jest/no-done-callback
    it("return true if it shouldnt exist and it doesnt exist", done => {
      mockFetchQuery.mockImplementationOnce(() => ({
        toPromise: () =>
          Promise.resolve({
            user: { userAlreadyExists: false },
          }),
      }))
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: false,
        relayEnvironment: null,
      }).then(result => {
        expect(result).toBeTruthy()
        done()
      })
    })

    // eslint-disable-next-line jest/no-done-callback
    it("return false if it shouldnt exist and it does exist", done => {
      mockFetchQuery.mockImplementationOnce(() => ({
        toPromise: () =>
          Promise.resolve({
            user: { userAlreadyExists: true },
          }),
      }))
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: false,
        relayEnvironment: null,
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })

    // eslint-disable-next-line jest/no-done-callback
    it("should gracefully handle a missing user object as if it were a missing user", done => {
      mockFetchQuery.mockImplementationOnce(() => ({
        toPromise: () => Promise.resolve({}),
      }))
      checkEmail({
        values: {
          email: "kana@lalamail.com",
        },
        actions: {
          setFieldError: jest.fn(),
          setSubmitting: jest.fn(),
        },
        shouldExist: true,
        relayEnvironment: null,
      }).then(result => {
        expect(result).toBeFalsy()
        done()
      })
    })
  })
})
