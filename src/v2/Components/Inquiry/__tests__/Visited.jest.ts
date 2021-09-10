import { Visited } from "../Visited"
import { get, set } from "cookies-js"

jest.mock("cookies-js")

describe("Visited", () => {
  let store = {}
  const visited = new Visited("test-visited")
  const setMock = set as jest.Mock
  const getMock = get as jest.Mock

  beforeEach(() => {
    setMock.mockImplementation(
      (name: string, value: any) => (store[name] = value)
    )

    getMock.mockImplementation((name: string) => store[name])
  })

  afterEach(() => {
    getMock.mockRestore()
    setMock.mockRestore()
    visited.reset()
    store = {}
  })

  it("initializes the value as empty array", () => {
    expect(visited.get()).toEqual([])
  })

  it("logs things", () => {
    visited.log("foo")
    expect(visited.get()).toEqual(["foo"])
    visited.log("bar")
    expect(visited.get()).toEqual(["foo", "bar"])
    visited.log("baz")
    expect(visited.get()).toEqual(["foo", "bar", "baz"])
    visited.log("foo")
    expect(visited.get()).toEqual(["foo", "bar", "baz"])
  })

  it("logs things across instances of the same name", () => {
    visited.log("foo")
    expect(visited.get()).toEqual(["foo"])

    const sameVisited = new Visited("test-visited")
    const otherVisited = new Visited("other-test-visited")

    expect(sameVisited.get()).toEqual(["foo"])
    expect(otherVisited.get()).toEqual([])

    sameVisited.log("bar")

    expect(sameVisited.get()).toEqual(["foo", "bar"])
    expect(otherVisited.get()).toEqual([])
  })

  describe("#hasSeen", () => {
    it("tells you if you logged something or not", () => {
      visited.log("foo")
      visited.log("bar")

      expect(visited.get()).toEqual(["foo", "bar"])

      expect(visited.hasSeen("foo")).toBe(true)
      expect(visited.hasSeen("bar")).toBe(true)
      expect(visited.hasSeen("baz")).toBe(false)
    })

    it("tells you if you logged a list of things", () => {
      visited.log("foo")
      visited.log("bar")

      expect(visited.hasSeen("foo", "bar")).toBe(true)
      expect(visited.hasSeen("foo", "bar", "baz")).toBe(false)
    })
  })

  describe("#hasSeenThisSession", () => {
    it("logs into both arrays", () => {
      visited.log("baz")

      expect(visited.hasSeen("baz")).toBe(true)
      expect(visited.hasSeenThisSession("baz")).toBe(true)
    })

    it("maintains a separate array of steps for logging things seen only this go around", () => {
      const mockVisited = new Visited("mock-visited")
      mockVisited.get = () => ["foo", "bar"]

      expect(mockVisited.hasSeen("foo", "bar")).toBe(true)
      expect(mockVisited.hasSeen("baz")).toBe(false)
      expect(mockVisited.hasSeenThisSession("foo")).toBe(false)
    })
  })
})
