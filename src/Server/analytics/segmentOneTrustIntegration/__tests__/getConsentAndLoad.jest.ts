import { conditionallyLoadAnalytics } from "../conditionallyLoadAnalytics"
import { getConsent } from "../getConsent"
import { getConsentAndLoad } from "../getConsentAndLoad"
import { setSegmentDestinationPref } from "../setSegmentDestinationPref"

jest.mock("../conditionallyLoadAnalytics")
jest.mock("../getConsent")
jest.mock("../setSegmentDestinationPref")

describe("getConsentAndLoad", () => {
  const conditionallyLoadAnalyticsMock = conditionallyLoadAnalytics as jest.Mock
  const getConsentMock = getConsent as jest.Mock
  const setSegmentDestinationPrefMock = setSegmentDestinationPref as jest.Mock

  afterEach(() => {
    conditionallyLoadAnalyticsMock.mockRestore()
    getConsentMock.mockRestore()
    setSegmentDestinationPrefMock.mockRestore()
  })

  it("loads segment if consent changed", async () => {
    getConsentMock.mockImplementation(() => Promise.resolve("C0001"))
    setSegmentDestinationPrefMock.mockImplementation(() => {
      return []
    })
    await getConsentAndLoad([], "", "C0001", "abc")
    expect(getConsentMock).toHaveBeenCalledWith()
    expect(setSegmentDestinationPrefMock).toHaveBeenCalledWith(
      "C0001",
      [],
      "C0001"
    )
    expect(conditionallyLoadAnalyticsMock).toHaveBeenCalledWith({
      destinationPref: [],
      writeKey: "abc",
    })
  })
  it("does not load segment if consent did not change", async () => {
    getConsentMock.mockImplementation(() => Promise.resolve(""))
    await getConsentAndLoad([], "", "C0001", "abc")
    expect(getConsentMock).toHaveBeenCalledWith()
    expect(setSegmentDestinationPrefMock).not.toHaveBeenCalled()
    expect(conditionallyLoadAnalyticsMock).not.toHaveBeenCalled()
  })
})
