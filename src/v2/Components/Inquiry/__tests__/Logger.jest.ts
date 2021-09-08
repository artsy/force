import { Logger } from "../Logger"
import { get, set } from "cookies-js"

jest.mock("cookies-js")

describe("Logger", () => {
  let store = {}
  const logger = new Logger("test-logger")
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
    logger.reset()
    store = {}
  })

  it("initializes the value as empty array", () => {
    expect(logger.get()).toEqual([])
  })

  it("logs things", () => {
    logger.log("foo")
    expect(logger.get()).toEqual(["foo"])
    logger.log("bar")
    expect(logger.get()).toEqual(["foo", "bar"])
    logger.log("baz")
    expect(logger.get()).toEqual(["foo", "bar", "baz"])
    logger.log("foo")
    expect(logger.get()).toEqual(["foo", "bar", "baz"])
  })

  it("logs things across instances of the same name", () => {
    logger.log("foo")
    expect(logger.get()).toEqual(["foo"])

    const sameLogger = new Logger("test-logger")
    const otherLogger = new Logger("other-test-logger")

    expect(sameLogger.get()).toEqual(["foo"])
    expect(otherLogger.get()).toEqual([])

    sameLogger.log("bar")

    expect(sameLogger.get()).toEqual(["foo", "bar"])
    expect(otherLogger.get()).toEqual([])
  })

  describe("#hasLogged", () => {
    it("tells you if you logged something or not", () => {
      logger.log("foo")
      logger.log("bar")

      expect(logger.get()).toEqual(["foo", "bar"])

      expect(logger.hasLogged("foo")).toBe(true)
      expect(logger.hasLogged("bar")).toBe(true)
      expect(logger.hasLogged("baz")).toBe(false)
    })

    it("tells you if you logged a list of things", () => {
      logger.log("foo")
      logger.log("bar")

      expect(logger.hasLogged("foo", "bar")).toBe(true)
      expect(logger.hasLogged("foo", "bar", "baz")).toBe(false)
    })
  })

  describe("#hasLoggedThisSession", () => {
    it("logs into both arrays", () => {
      logger.log("baz")

      expect(logger.hasLogged("baz")).toBe(true)
      expect(logger.hasLoggedThisSession("baz")).toBe(true)
    })

    it("maintains a separate array of steps for logging things seen only this go around", () => {
      const mockLogger = new Logger("mock-logger")
      mockLogger.get = () => ["foo", "bar"]

      expect(mockLogger.hasLogged("foo", "bar")).toBe(true)
      expect(mockLogger.hasLogged("baz")).toBe(false)
      expect(mockLogger.hasLoggedThisSession("foo")).toBe(false)
    })
  })
})
