import Backbone from "backbone"
import {
  attachInquiryAnalyticsHooks,
  teardownInquiryAnalyticsHooks,
} from "../analytics"

jest.mock("../analytics/analyticsHooks", () => ({
  analyticsHooks: {
    trigger: jest.fn(),
    on: jest.fn(),
  },
}))
const analyticsHooks = require("../analytics/analyticsHooks").analyticsHooks
  .trigger as jest.Mock

describe("analytics proxy", () => {
  let context
  let inquiry
  beforeEach(() => {
    inquiry = new Backbone.Model()
    context = {
      inquiry,
      modal: { on: jest.fn(), off: jest.fn() },
      user: new Backbone.Model(),
      artwork: new Backbone.Model(),
      collectorProfile: new Backbone.Model(),
      userInterests: new Backbone.Model(),
      state: new Backbone.Model(),
      foo: "not eventable",
    }
    attachInquiryAnalyticsHooks(context)
  })

  afterEach(() => {
    analyticsHooks.mockClear()
    teardownInquiryAnalyticsHooks(context)
  })

  describe("#attach", () => {
    it("proxies all the events with a namespace", () => {
      inquiry.trigger("sync")
      const [eventHook, args] = analyticsHooks.mock.calls[0]

      expect(eventHook).toBe("inquiry_questionnaire:inquiry:sync")
      expect(Object.keys(args)).toEqual([
        "inquiry",
        "modal",
        "user",
        "artwork",
        "collectorProfile",
        "userInterests",
        "state",
        "foo",
      ])
    })
  })
})
