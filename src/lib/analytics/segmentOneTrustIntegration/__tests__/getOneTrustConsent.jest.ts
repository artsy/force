import { delay } from "../delay"
import { getOneTrustConsent } from "../getOneTrustConsent"
import { oneTrustReady } from "../oneTrustReady"

jest.mock("../delay")
jest.mock("../oneTrustReady")

describe("getOneTrustConsent", () => {
  const delayMock = delay as jest.Mock
  const oneTrustReadyMock = oneTrustReady as jest.Mock

  beforeEach(() => {
    delayMock.mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    delayMock.mockRestore()
    oneTrustReadyMock.mockRestore()
  })

  it("returns empty string if onetrust is never ready", async () => {
    oneTrustReadyMock.mockImplementation(() => {
      return false
    })
    const result = await getOneTrustConsent()
    expect(delayMock).toHaveBeenCalledWith(10)
    expect(delayMock).toHaveBeenCalledTimes(101)
    expect(oneTrustReadyMock).toHaveBeenCalledWith()
    expect(oneTrustReadyMock).toHaveBeenCalledTimes(103)
    expect(result).toBe("")
  })
  it("returns onetrust consent string if onetrust is ready", async () => {
    oneTrustReadyMock.mockImplementation(() => {
      return true
    })
    window.OnetrustActiveGroups = "C0001"
    const result = await getOneTrustConsent()
    expect(delayMock).not.toHaveBeenCalled()
    expect(oneTrustReadyMock).toHaveBeenCalledWith()
    expect(result).toBe("C0001")
  })
})
