/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const { fabricate } = require("@artsy/antigravity")
const Fair = require("../../../models/fair.coffee")
const FairEvent = require("../../../models/fair_event.coffee")
const FairEvents = require("../../../collections/fair_events.coffee")
const InfoMenu = require("../info_menu.coffee")
const Articles = require("../../../collections/articles.coffee")
const Article = require("../../../models/article.coffee")
const cache = require("../../../lib/cache")

describe("InfoMenu", function () {
  beforeEach(function () {
    this.fair = new Fair(fabricate("fair"))
    this.infoMenu = new InfoMenu({ fair: this.fair })
    this.fairEvent = new FairEvent(fabricate("fair_event"), {
      fairId: this.fair.id,
    })

    this.cache = {}
    return (
      sinon
        .stub(Backbone, "sync")
        // Events fetch
        .onCall(0)
        .yieldsTo("success", [this.fairEvent])
        // Programming Articles fetch
        .onCall(1)
        .yieldsTo("error", {})
        // Artsy At The Fair Articles fetch
        .onCall(2)
        .yieldsTo("error", {})
    )
  })

  afterEach(() => Backbone.sync.restore())

  it("fetches the infoMenu", function () {
    this.infoMenu.fetch({ cache: false })
    const urls = _.map(Backbone.sync.args, args => _.result(args[1], "url"))
    urls[0].should.containEql(`/api/v1/fair/${this.fair.id}/fair_events`)
    urls[1].should.containEql("/api/articles")
    return urls[2].should.containEql("/api/articles")
  })

  return it("resolves with the infoMenu", function () {
    return this.infoMenu.fetch({ cache: false }).then(infoMenu =>
      infoMenu.should.eql({
        events: true,
        programming: false,
        artsyAtTheFair: false,
      })
    )
  })
})
