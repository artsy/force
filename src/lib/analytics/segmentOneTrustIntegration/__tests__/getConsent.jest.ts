import { getConsent } from "../getConsent"
import { getOneTrustConsent } from "../getOneTrustConsent"

jest.mock("../getOneTrustConsent")

describe("getConsent", () => {
  const getOneTrustConsentMock = getOneTrustConsent as jest.Mock

  afterEach(() => {
    getOneTrustConsentMock.mockRestore()
  })

  it("returns C0001 if does not get onetrust consent", async () => {
    getOneTrustConsentMock.mockImplementation(() => Promise.resolve(""))
    const result = await getConsent()
    expect(result).toBe("C0001")
  })
  it("returns onetrust consent if it gets onetrust consent", async () => {
    getOneTrustConsentMock.mockImplementation(() =>
      Promise.resolve("C0001,C0002")
    )
    const result = await getConsent()
    expect(result).toBe("C0001,C0002")
  })
})
