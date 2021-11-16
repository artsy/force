import { fabricate } from "@artsy/antigravity"
import Backbone from "backbone"
const { OrderedSets } = require("../ordered_sets")

describe("OrderedSets", () => {
  let orderedSets

  beforeEach(() => {
    Backbone.sync = jest.fn()
    // @ts-ignore
    global.Promise.allSettled = jest.fn()
    orderedSets = new OrderedSets({
      key: "browse:featured-genes",
    })
  })

  describe("#fetch", () => {
    it("sends the appropriate data as a query string", () => {
      orderedSets.fetch()
      Backbone.sync.mock.calls[0][2].data.should.eql({
        key: "browse:featured-genes",
        public: true,
      })
    })
  })

  describe("#fetchSets", () => {
    let fetchItems

    beforeEach(() => {
      fetchItems = jest.fn()
      orderedSets.model.prototype.fetchItems = fetchItems
      orderedSets.add([fabricate("ordered_set")])
      orderedSets.add([fabricate("ordered_set")])
    })

    it("should call #fetchItems for set in the collection", () => {
      orderedSets.fetchSets()
      expect(fetchItems).toBeCalledTimes(2)
    })

    it("should be a promise", () => {
      orderedSets.fetchSets()
      // @ts-ignore
      expect(global.Promise.allSettled).toBeCalled()
    })
  })

  describe("#fetchAll", () => {
    beforeEach(() => {
      orderedSets.fetch = jest.fn().mockReturnValue({
        then(cb) {
          cb()
        },
      })
      orderedSets.fetchSets = jest.fn().mockReturnValue({
        then(cb) {
          cb()
        },
      })
      orderedSets.model.prototype.fetchItems = jest.fn()
    })

    it("triggers sync:complete when it is done", async () => {
      const onComplete = jest.fn()
      orderedSets.on("sync:complete", onComplete)
      await orderedSets.fetchAll()
      expect(onComplete).toBeCalled()
    })
  })
})
