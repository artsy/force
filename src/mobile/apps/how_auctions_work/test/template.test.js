/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const learnMoreTemplate = require("jade").compileFile(
  require.resolve("../templates/learn_more.jade")
)
const fixture = require("../fixtures/data.json")
const markdown = require("../../../components/util/markdown.coffee")
const bidIncrements = require("../bid_increments.coffee")
const benv = require("benv")
const { resolve } = require("path")

describe("/how-auctions-work", () =>
  describe("learn_more", function () {
    before(done =>
      benv.setup(() => {
        benv.expose({ $: benv.require("jquery") })
        return benv.render(
          resolve(__dirname, "../templates/learn_more.jade"),
          {
            sd: {},
            _: require("underscore"),
            asset() {},
            page: fixture,
            markdown,
            bidIncrements,
            user: null,
          },
          () => done()
        )
      })
    )

    after(() => benv.teardown())

    return it("renders correctly", function () {
      $("h1").length.should.eql(5)
      return $(".leader-dots-list-item").length.should.eql(8)
    })
  }))
