import { fetchQuery } from "relay-runtime"
import { checkEmail } from "../helpers"
import { password } from "../Validators"

jest.mock("relay-runtime", () => ({ fetchQuery: jest.fn() }))
let mockFetchQuery = fetchQuery as jest.Mock<any>

describe("Authentication Helpers", () => {
  beforeEach(() => {
    mockFetchQuery.mockImplementation(() => ({
      toPromise: jest.fn(),
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe("checkEmail", () => {
    // eslint-disable-next-line jest/no-done-callback
    it("return true if it should exist and it does exist", done => {
      mockFetchQuery.mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({
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
        toPromise: jest.fn().mockResolvedValue({
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
        toPromise: jest.fn().mockResolvedValue({
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
        toPromise: jest.fn().mockResolvedValue({
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
        toPromise: jest.fn().mockResolvedValue({}),
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

  describe("password validation", () => {
    it("rejects passwords that are too short", async () => {
      const candidate = "short"
      await expect(password.validate(candidate)).rejects.toThrow(
        "must be at least 8"
      )
    })

    it("rejects passwords that have no digits", async () => {
      const candidate = "longenough"
      await expect(password.validate(candidate)).rejects.toThrow(
        "must have at least 1 digit"
      )
    })

    it("rejects passwords that have no lowercase letters", async () => {
      const candidate = "LONGENOUGH1"
      await expect(password.validate(candidate)).rejects.toThrow(
        "must have at least 1 lowercase letter"
      )
    })

    it("rejects passwords that have no uppercase letters", async () => {
      const candidate = "longenough1"
      await expect(password.validate(candidate)).rejects.toThrow(
        "must have at least 1 uppercase letter"
      )
    })

    it("resolves passwords that are valid", async () => {
      const candidate = "Longenough1"
      await expect(password.validate(candidate)).resolves.toEqual(candidate)
    })
  })
})
