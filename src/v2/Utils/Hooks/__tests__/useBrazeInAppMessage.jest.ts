import {
  generateAppboyFuncs,
  generateBrazeEffect,
  generateMessageHandler,
  isMatchingRoute,
} from "../useBrazeInAppMessage"

const generateOptions = () => {
  const analytics = { ready: jest.fn() }
  const appboy = {
    display: { showInAppMessage: jest.fn() },
    removeSubscription: jest.fn(),
    subscribeToNewInAppMessages: jest.fn(() => "abc123"),
  }
  const pathname = "/"

  return { analytics, appboy, pathname }
}

describe("generateBrazeEffect", () => {
  describe("without the segment sdk", () => {
    it("skips the ready handler and returns nothing", () => {
      const effect = generateBrazeEffect({
        ...generateOptions(),
        analytics: undefined,
      })

      const teardown = effect()

      expect(teardown).toEqual(undefined)
    })
  })

  describe("without the braze sdk", () => {
    it("skips the ready handler and returns nothing", () => {
      const effect = generateBrazeEffect({
        ...generateOptions(),
        appboy: undefined,
      })

      const teardown = effect()

      expect(teardown).toEqual(undefined)
    })
  })

  describe("without a pathname", () => {
    it("skips the ready handler and returns nothing", () => {
      const effect = generateBrazeEffect({
        ...generateOptions(),
        pathname: undefined,
      })

      const teardown = effect()

      expect(teardown).toEqual(undefined)
    })
  })

  describe("with all the things", () => {
    it("calls the ready handler and returns a teardown func", () => {
      const options = generateOptions()

      const effect = generateBrazeEffect({
        ...options,
      })

      const teardown = effect()

      expect(options.analytics.ready).toHaveBeenCalled()
      expect(teardown).not.toEqual(undefined)
    })
  })
})

describe("generateAppboyFuncs", () => {
  describe("when analytics ready never fires", () => {
    it("never establishes a subscription and skips removing a subscription", () => {
      const { appboy, pathname } = generateOptions()
      const { effectTeardown } = generateAppboyFuncs(appboy, pathname)

      effectTeardown()

      expect(appboy.subscribeToNewInAppMessages).not.toHaveBeenCalled()
      expect(appboy.removeSubscription).not.toHaveBeenCalled()
    })
  })

  describe("when analytics ready fires", () => {
    it("establishes a subscription and removes it during teardown", () => {
      const { appboy, pathname } = generateOptions()
      const { handleAnalyticsReady, effectTeardown } = generateAppboyFuncs(
        appboy,
        pathname
      )

      handleAnalyticsReady()
      effectTeardown()

      expect(appboy.subscribeToNewInAppMessages).toHaveBeenCalled()
      expect(appboy.removeSubscription).toHaveBeenCalled()
    })
  })
})

describe("generateMessageHandler", () => {
  describe("with an empty array of messages", () => {
    it("skips showing messages and returns that empty array", () => {
      const { appboy, pathname } = generateOptions()
      const messageHandler = generateMessageHandler(appboy, pathname)

      const inAppMessages = []
      const remainingMessages = messageHandler(inAppMessages)

      expect(appboy.display.showInAppMessage).not.toHaveBeenCalled()
      expect(remainingMessages).toEqual([])
    })
  })

  describe("with an invalid pathname", () => {
    it("skips showing messages and returns the messages", () => {
      const { appboy } = generateOptions()
      const messageHandler = generateMessageHandler(appboy, "invalid")

      const inAppMessages = [{}]
      const remainingMessages = messageHandler(inAppMessages)

      expect(appboy.display.showInAppMessage).not.toHaveBeenCalled()
      expect(remainingMessages).toEqual([{}])
    })
  })

  describe("with a message and a matching pathname", () => {
    it("shows that message and returns an empty array", () => {
      const { appboy, pathname } = generateOptions()
      const messageHandler = generateMessageHandler(appboy, pathname)

      const inAppMessages = [{}]
      const remainingMessages = messageHandler(inAppMessages)

      expect(appboy.display.showInAppMessage).toHaveBeenCalled()
      expect(remainingMessages).toEqual([])
    })
  })
})

describe("isMatchingRoute", () => {
  const validRoutes = [
    "/",
    "/art-fairs",
    "/article/best-art-in-the-world",
    "/articles",
    "/artist/andy-warhol",
    "/artists",
    "/auctions",
    "/collect",
    "/collection/trove",
    "/fair/outside-tent-thingy",
    "/galleries",
    "/gene/works-on-paper",
    "/partner/abc-gallery",
    "/show/only-blue-paintings",
    "/shows",
    "/viewing-room/for-your-eyes-only",
    "/viewing-rooms",
  ]

  const invalidRoutes = [
    "/artist/andy-warhol/works-for-sale",
    "/auction/fancy-prints-2022",
    "/categories",
    "/collections",
    "/login",
    "/sell",
  ]

  it("returns boolean for valid and invalid paths", () => {
    const validResults = validRoutes.map(
      route => isMatchingRoute(route) === true
    )

    const invalidResults = invalidRoutes.map(
      route => isMatchingRoute(route) === false
    )

    expect(validResults.length).toEqual(validResults.length)
    expect(invalidResults.length).toEqual(invalidResults.length)
  })
})
