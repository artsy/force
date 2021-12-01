import { fetchDestinations } from "../fetchDestinations"
import { fetchDestinationForWriteKey } from "../fetchDestinationForWriteKey"

jest.mock("../fetchDestinationForWriteKey")

describe("fetchDestinations", () => {
  const fetchDestinationForWriteKeyMock = fetchDestinationForWriteKey as jest.Mock

  afterEach(() => {
    fetchDestinationForWriteKeyMock.mockRestore()
  })

  it("returns destinations", async () => {
    fetchDestinationForWriteKeyMock.mockImplementation(key =>
      Promise.resolve([{ id: "foo" }])
    )
    const result = await fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("removes repeater destinations", async () => {
    fetchDestinationForWriteKeyMock.mockImplementation(key =>
      Promise.resolve([{ id: "foo" }, { id: "Repeater" }])
    )
    const result = await fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
  it("removes duplicate destinations", async () => {
    fetchDestinationForWriteKeyMock.mockImplementation(key =>
      Promise.resolve([{ id: "foo" }, { id: "foo" }])
    )
    const result = await fetchDestinations("abc")
    expect(result).toEqual([{ id: "foo" }])
  })
})
