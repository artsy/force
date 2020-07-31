/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const { fabricate } = require("@artsy/antigravity")
const sinon = require("sinon")
const routes = require("../routes")
const Backbone = require("backbone")
const Profile = require("../../../models/profile")
const Fair = require("../../../models/fair")
const Show = require("../../../models/show")

describe("vanity routes", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  it("require a profile of the fair organizer or fair type or goes to the next route", function () {
    const spy = sinon.spy()
    const req = {
      params: {},
      profile: new Profile(fabricate("profile", { owner_type: "User" })),
    }
    routes.mainPage(req, {}, spy)
    routes.exhibitors(req, {}, spy)
    routes.artworks(req, {}, spy)
    return spy.callCount.should.equal(3)
  })

  return it("does not go to the next route if the profile owner is a fair", function () {
    let renderStub
    routes.mainPage(
      {
        params: { id: "foo-fair" },
        profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
      },
      { locals: { sd: {} }, render: (renderStub = sinon.stub()) }
    )
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    renderStub.args[0][0].should.equal("main_page")
    return renderStub.args[0][1].fair.get("name").should.equal("Foo Fair")
  })
})

describe("#mainPage", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  return it("renders the main page", function () {
    let renderStub
    routes.mainPage(
      {
        params: { id: "foo-fair" },
        profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
      },
      { locals: { sd: {} }, render: (renderStub = sinon.stub()) }
    )
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    renderStub.args[0][0].should.equal("main_page")
    return renderStub.args[0][1].fair.get("name").should.equal("Foo Fair")
  })
})

describe("#exhibitors", function () {
  beforeEach(function () {
    this.req = {
      params: { id: "foo-fair" },
      profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
    }
    this.res = { locals: { sd: {} }, render: sinon.stub() }
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  it("renders the exhibitors page", function () {
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    Backbone.sync.args[1][2].success({
      results: [fabricate("show", { fair_location: { display: "booth 20" } })],
    })
    this.res.render.args[0][0].should.equal("exhibitors_page")
    return this.res.render.args[0][1].shows
      .first()
      .formattedLocation()
      .should.equal("booth 20")
  })

  it('sets the title to "Exhibitors a {section}" if a section param', function () {
    this.req.params.section = "Pier 9"
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    Backbone.sync.args[1][2].data.section.should.equal("Pier 9")
    Backbone.sync.args[1][2].success({
      results: [fabricate("show", { fair_location: { display: "booth 20" } })],
    })
    return this.res.render.args[0][1].title.should.equal("Exhibitors at Pier 9")
  })

  it('sets the title to "{Artist Name}" if a artist param', function () {
    this.req.params.artistId = "andy-foobar"
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    Backbone.sync.args[1][2].success({
      results: [
        fabricate("show", {
          artworks: [
            fabricate("artwork", {
              artist: fabricate("artist", { name: "Andy Foobar" }),
            }),
          ],
        }),
      ],
    })
    return this.res.render.args[0][1].title.should.equal("Andy Foobar")
  })

  it("scopes by partner if passed a partner param", function () {
    this.req.params.partnerId = "the-big-gago"
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    Backbone.sync.args[1][2].data.partner.should.equal("the-big-gago")
    Backbone.sync.args[1][2].success({
      results: [fabricate("show", { fair_location: { display: "booth 20" } })],
    })
    return this.res.render.args[0][1].showParams.partner.should.equal(
      "the-big-gago"
    )
  })

  it("scopes by artist if passed a partner param", function () {
    this.req.params.artistId = "andy-foobar"
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    return Backbone.sync.args[1][2].data.artist.should.equal("andy-foobar")
  })

  return it("is fine when there is bad data and the API returns no shows", function () {
    routes.exhibitors(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    return Backbone.sync.args[0][2].success({ results: [] })
  })
})

describe("#artworks", function () {
  beforeEach(function () {
    this.req = {
      params: { id: "foo-fair" },
      profile: new Profile(
        fabricate("profile", {
          owner_type: "Fair",
          owner: { default_fair_id: "armory-show" },
        })
      ),
    }
    this.res = { locals: { sd: {} }, render: sinon.stub() }
    return sinon.stub(Backbone, "sync")
  })

  afterEach(() => Backbone.sync.restore())

  return it("renders the artwork page", function () {
    this.req.query = { foo: "bar" }
    routes.artworks(this.req, this.res)
    Backbone.sync.args[0][2].success(fabricate("fair"))
    return this.res.render.args[0][0].should.equal("artworks")
  })
})

describe("#info", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  return it("renders the info page", function () {
    let renderStub
    routes.info(
      {
        params: { id: "foo-fair" },
        profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
      },
      { render: (renderStub = sinon.stub()) }
    )
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    renderStub.args[0][0].should.equal("info")
    return renderStub.args[0][1].fair.get("name").should.equal("Foo Fair")
  })
})

describe("#trending", function () {
  beforeEach(() => sinon.stub(Backbone, "sync"))

  afterEach(() => Backbone.sync.restore())

  return it("renders the trending page", function () {
    let renderStub
    routes.trending(
      {
        params: { id: "foo-fair" },
        profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
      },
      { render: (renderStub = sinon.stub()), locals: { sd: {} } }
    )
    Backbone.sync.args[0][2].success(fabricate("fair", { name: "Foo Fair" }))
    renderStub.args[0][0].should.equal("trending")
    return renderStub.args[0][1].fair.get("name").should.equal("Foo Fair")
  })
})

describe("#showRedirect", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.partner = new Profile(fabricate("partner"))
    this.res = { backboneError: sinon.stub(), redirect: sinon.stub() }

    const fairOrg = new Profile(fabricate("profile", { owner_type: "Fair" }))
    const fair = new Fair(fabricate("fair"))

    fairOrg.set("owner", fair.attributes)

    return (this.req = {
      params: {
        id: "foo-fair",
        partnerId: this.partner.get("id"),
      },
      profile: fairOrg,
    })
  })

  afterEach(() => Backbone.sync.restore())

  return it("redirects to show page", function () {
    routes.showRedirect(this.req, this.res)
    const show = fabricate("show")

    Backbone.sync.args[0][1].url.should.containEql(
      "fair/armory-show-2013/shows"
    )
    Backbone.sync.args[0][2].data.partner.should.equal(this.partner.get("id"))
    Backbone.sync.args[0][2].success({ results: [show] })
    return this.res.redirect.args[0][0].should.containEql(new Show(show).href())
  })
})

describe("#search", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    return (this.res = {
      backboneError: sinon.stub(),
      redirect: sinon.stub(),
      render: sinon.stub(),
    })
  })

  afterEach(() => Backbone.sync.restore())

  it("searches", function () {
    const req = {
      query: { term: "bitty" },
      params: { id: "foo-fair" },
      profile: new Profile(fabricate("profile", { owner_type: "Fair" })),
    }
    routes.search(req, this.res)
    Backbone.sync.args[0][2].success(
      fabricate("fair", { name: "Foo Fair", id: "percy" })
    )
    Backbone.sync.args[1][2].data.term.should.equal("bitty")
    Backbone.sync.args[1][2].data.fair_id.should.equal("percy")
    return Backbone.sync.args[2][2].data.term.should.equal("bitty")
  })

  return it("redirects without query", function () {
    const req = {
      params: { id: "bitty" },
      profile: new Profile(
        fabricate("profile", {
          owner_type: "Fair",
          owner: { default_fair_id: "bitty" },
        })
      ),
    }
    routes.search(req, this.res)
    return this.res.redirect.args[0][0].should.equal("/bitty")
  })
})
