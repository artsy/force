/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate, fabricate2 } = require("@artsy/antigravity")
const _ = require("underscore")
let sinon = require("sinon")
const Backbone = require("backbone")
const rewire = require("rewire")
const routes = rewire("../routes")
const CurrentUser = require("../../../models/current_user.coffee")
const Fair = require("../../../models/fair.coffee")
const Fairs = require("../../../collections/fairs.coffee")
const FairOrganizer = require("../../../models/fair_organizer.coffee")
const Profile = require("../../../models/profile.coffee")
const FilterSuggest = require("../../../models/filter_suggest")
const FilteredSearchOptions = require("../../../models/filter_suggest")
const OrderedSets = require("../../../collections/ordered_sets")
const CoverImage = require("../../../models/cover_image")

describe("Fair routes", function () {
  beforeEach(function () {
    this.req = { params: { id: "some-fair" } }
    return (this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: {
          API_URL: "http://localhost:5000",
          FAIR: new Fair(fabricate("fair")),
        },
        fair: new Fair(fabricate("fair")),
        profile: new Profile(fabricate("fair_profile")),
      },
    })
  })

  describe("#all", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    return it("next is called without a fair", function () {
      let next
      this.res.locals.sd.FAIR = undefined

      routes.overview(this.req, this.res, (next = sinon.stub()))
      next.called.should.be.ok()

      routes.forYou(this.req, this.res, (next = sinon.stub()))
      next.called.should.be.ok()

      routes.fairArticles(this.req, this.res, (next = sinon.stub()))
      next.called.should.be.ok()

      routes.browse(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })
  })

  describe("#overview", function () {
    before(() =>
      sinon
        .stub(Backbone, "sync")
        .yieldsTo("success", {})
        .onCall(0)
        .yieldsTo("success", fabricate("fair"))
    )

    after(() => Backbone.sync.restore())

    return it("renders the overview template", function () {
      routes.overview(this.req, this.res)
      _.last(Backbone.sync.args)[2].success(fabricate2("filter_artworks"))
      return _.defer(() => {
        this.res.locals.sd.SECTION.should.equal("overview")
        return this.res.render.args[0][0].should.equal("overview")
      })
    })
  })

  describe("#foryou", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    return it("renders the foryou template", function () {
      routes.forYou(this.req, this.res)
      this.res.locals.sd.SECTION.should.equal("forYou")
      return this.res.render.args[0][0].should.equal("index")
    })
  })

  describe("#fairArticles", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    return it("renders the posts template", function () {
      routes.fairArticles(this.req, this.res)
      this.res.locals.sd.SECTION.should.equal("posts")
      return this.res.render.args[0][0].should.equal("index")
    })
  })

  describe("#captureSignup", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    it("triggers next if a user is not defined", function () {
      let next
      routes.captureSignup(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })

    it("triggers next if a the action is not valid", function () {
      let next
      this.req.params = { action: "watergun" }
      this.req.user = new CurrentUser(fabricate("user"))
      routes.captureSignup(this.req, this.res, (next = sinon.stub()))
      return next.called.should.be.ok()
    })

    it("follows the fair and adds a user fair action to the users collector profile", function () {
      let next
      this.req.params = { action: "attendee" }
      this.req.user = new CurrentUser(
        fabricate("user", { accessToken: "secret-code" })
      )
      routes.captureSignup(this.req, this.res, (next = sinon.stub()))
      Backbone.sync.args[0][1].get("fair_id").should.equal("armory-show-2013")
      Backbone.sync.args[0][1].get("access_token").should.equal("secret-code")
      Backbone.sync.args[1][1].get("profile_id").should.equal("the-armory-show")
      return Backbone.sync.args[0][1]
        .get("access_token")
        .should.equal("secret-code")
    })

    return it("triggers next if the action is attendee", function () {
      let next
      Backbone.sync.yieldsTo("success")
      this.req.params = { action: "attendee" }
      this.req.user = new CurrentUser(fabricate("user"))
      return routes
        .captureSignup(this.req, this.res, (next = sinon.stub()))
        .then(() => next.called.should.be.true())
    })
  })

  describe("#search", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    it("searches", function () {
      const req = { params: { id: "some-fair" }, query: { q: "foobar" } }
      routes.search(req, this.res)
      _.last(Backbone.sync.args)[0].should.equal("read")
      return _.last(Backbone.sync.args)[2].data.term.should.equal("foobar")
    })

    return it("redirects without query", function () {
      const req = { params: { id: "some-fair" }, query: {} }
      routes.search(req, this.res)
      return this.res.redirect.args[0][0].should.equal("/some-fair")
    })
  })

  describe("#browse", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    return it("renders index", function () {
      routes.browse(this.req, this.res)
      _.last(Backbone.sync.args)[2].success(fabricate2("filter_artworks"))
      return this.res.render.args[0][0].should.equal("index")
    })
  })

  return describe("#showRedirect", function () {
    beforeEach(() => sinon.stub(Backbone, "sync"))

    afterEach(() => Backbone.sync.restore())

    return it("redirects to show page", function () {
      const show = fabricate("show")
      routes.showRedirect(this.req, this.res)
      _.last(Backbone.sync.args)[2].success([
        {
          results: [show],
          next: "foo",
        },
      ])
      return this.res.redirect.args[0][0].should.containEql(
        "/show/gagosian-gallery-inez-and-vinood"
      )
    })
  })
})

describe("#fetchFairData", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    sinon.stub(Fair.prototype, "fetchOverviewData")
    sinon.stub(Fair.prototype, "fetchPrimarySets")
    this.success = function () {
      Fair.prototype.fetchPrimarySets.args[0][0].success()
      return Fair.prototype.fetchOverviewData.args[0][0].success({
        fair: new Fair(fabricate("fair", { id: "the-foo-show" })),
        filterSuggest: new FilterSuggest({ design: 4002, drawing: 3772 }),
        filteredSearchOptions: new FilterSuggest({
          design: 4002,
          drawing: 3772,
        }),
        filteredSearchColumns: [],
        sections: new Backbone.Collection(),
        galleries: new Backbone.Collection([fabricate("partner")]),
        exhibitorsCount: 1,
        exhibitorsAToZGroup: [],
        artistsAToZGroup: [],
        coverImage: new CoverImage(fabricate("cover_image")),
      })
    }
    this.cache = routes.__get__("cache")
    this.cache.setHash = sinon.stub()

    const profile = new Profile(
      _.extend(fabricate("fair_profile"), {
        owner_type: "Fair",
        id: "thefooshow",
      })
    )

    this.req = { params: { id: "the-foo-show" } }
    this.res = { locals: { sd: {}, profile } }
    return (this.next = sinon.stub())
  })

  afterEach(function () {
    Backbone.sync.restore()
    Fair.prototype.fetchOverviewData.restore()
    return Fair.prototype.fetchPrimarySets.restore()
  })

  it("fetches the fair data", function () {
    routes.fetchFairData(this.req, this.res, this.next)
    this.success()
    return Fair.prototype.fetchOverviewData.called.should.be.ok()
  })

  it("sets a bunch of locals", function () {
    routes.fetchFairData(this.req, this.res, this.next)
    this.success()
    this.res.locals.fair.get("id").should.equal("the-foo-show")
    this.res.locals.sd.EXHIBITORS_COUNT.should.equal(1)
    this.res.locals.sd.FAIR.id.should.equal("the-foo-show")
    return this.res.locals.sd.PROFILE.id.should.equal("thefooshow")
  })

  it("caches the data in a special key", function () {
    routes.fetchFairData(this.req, this.res, this.next)
    this.success()
    return this.cache.setHash.args[0][0].should.equal("fair:the-foo-show")
  })

  return it("caches the big blob of data", function () {
    routes.fetchFairData(this.req, this.res, this.next)
    this.success()
    ;(this.cache.setHash.args[0][1].fair != null).should.be.ok()
    return (this.cache.setHash.args[0][1].filterSuggest != null).should.be.ok()
  })
})

describe("#fetchFairByOrganizerYear", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")

    const profile = new Profile(
      _.extend(fabricate("fair_organizer_profile"), {
        owner: fabricate("fair_organizer"),
      })
    )

    this.fairs = [
      fabricate("fair", {
        start_at: new Date("2-2-2014"),
        id: "2014",
        default_profile_id: "2014",
      }),
      fabricate("fair", {
        start_at: new Date("2-2-2015"),
        id: "2015",
        default_profile_id: "2015",
      }),
      fabricate("fair", {
        start_at: new Date("2-2-2016"),
        id: "2016",
        default_profile_id: "2016",
      }),
    ]

    this.req = { params: { id: "the-armory-show", year: "2015" } }
    this.res = { locals: { sd: {}, profile } }
    return (this.next = sinon.stub())
  })

  afterEach(() => Backbone.sync.restore())

  it("fetches the correct fair by year through the fair organizer", function () {
    routes.fetchFairByOrganizerYear(this.req, this.res, this.next)
    Backbone.sync.args[0][2].success(this.fairs)
    this.next.called.should.not.be.ok()
    return Backbone.sync.args[1][1].attributes.id.should.equal("2015")
  })

  return it("nexts if the fair organizer does not have a fair with requested year", function () {
    this.req = { params: { id: "the-armory-show", year: "2017" } }
    routes.fetchFairByOrganizerYear(this.req, this.res, this.next)
    Backbone.sync.args[0][2].success(this.fairs)
    return this.next.called.should.be.ok()
  })
})

//
// Microsite middleware test
//
sinon = require("sinon")
const micrositeMiddleware = require("../routes").microsite

describe("microsite middleware", function () {
  describe("does not have the microsite context", function () {
    beforeEach(function () {
      this.req = { query: {} }
      return (this.res = { locals: { sd: {} } })
    })

    it("leaves the locals alone", function () {
      micrositeMiddleware(this.req, this.res, function () {})
      return this.res.locals.sd.MICROSITE.should.not.be.ok()
    })

    return it("leaves the locals alone unless all of the contextual params are present", function () {
      this.req.query.microsite = "1"
      micrositeMiddleware(this.req, this.res, function () {})
      this.res.locals.sd.MICROSITE.should.not.be.ok()

      this.req.query.fair_id = "armory-show-2013"
      micrositeMiddleware(this.req, this.res, function () {})
      this.res.locals.sd.MICROSITE.should.not.be.ok()

      this.req.query.profile_id = "thearmoryshow"
      micrositeMiddleware(this.req, this.res, function () {})
      this.res.locals.sd.MICROSITE.should.not.be.ok()

      this.req.query.fair_name = "Armory%20Show%202013"
      micrositeMiddleware(this.req, this.res, function () {})
      // Now has all the params
      return this.res.locals.sd.MICROSITE.should.be.ok()
    })
  })

  return describe("has the microsite context", function () {
    beforeEach(function () {
      this.req = {
        query: {
          microsite: "1",
          fair_id: "armory-show-2013",
          fair_name: "Armory%20Show%202013",
          profile_id: "thearmoryshow",
        },
      }
      return (this.res = { locals: { sd: {} } })
    })

    return it("sets up the data for the microsite header template", function () {
      let fair, profile
      micrositeMiddleware(this.req, this.res, function () {})

      // Locals
      ;(fair = this.res.locals.micrositeFair).constructor.name.should.equal(
        "Fair"
      )
      fair.id.should.equal(this.req.query.fair_id)
      fair.get("name").should.equal(this.req.query.fair_name)
      fair.get("organizer").profile_id.should.equal(this.req.query.profile_id)
      ;(profile = this.res.locals
        .micrositeProfile).constructor.name.should.equal("Profile")
      profile.id.should.equal(this.req.query.profile_id)

      // Sharify locals
      const { sd } = this.res.locals
      sd.MICROSITE.should.be.ok()
      sd.MICROSITE_FAIR.should.eql(fair.toJSON())
      return sd.MICROSITE_PROFILE.should.eql(profile.toJSON())
    })
  })
})
