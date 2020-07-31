/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const benv = require("benv")
const rewire = require("rewire")
const Backbone = require("backbone")
const Partner = require("../../../../../models/partner.coffee")
const PartnerShow = require("../../../../../models/partner_show.coffee")
const PartnerShows = require("../../../../../collections/partner_shows.coffee")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")

const FixedCellsCountCarousel = rewire("../view.coffee")

describe("FixedCellsCountCarousel", function () {
  beforeEach(function (done) {
    return benv.setup(() => {
      benv.expose({ $: benv.require("jquery") })
      Backbone.$ = $
      sinon.stub(Backbone, "sync")
      this.partner = new Partner(fabricate("partner"))
      return done()
    })
  })

  afterEach(function () {
    benv.teardown()
    return Backbone.sync.restore()
  })

  describe("#initialize", function () {
    it("allows passing fetchOptions as an object and converts it to an array", function () {
      const fetchOptions = { page: 1, size: 20, sort: "-start_at" }
      const view = new FixedCellsCountCarousel({
        partner: this.partner,
        collection: new PartnerShows(),
        fetchOptions,
      })
      view.fetchOptions.should.be.an.Array()
      return view.fetchOptions.should.eql([fetchOptions])
    })

    return it("raises an error if no collection provided", function () {
      const { partner } = this
      return (() =>
        new FixedCellsCountCarousel({
          partner,
          fetchOptions: { page: 1, size: 15 },
        })).should.throw("no collection provided")
    })
  })

  describe("#fetch", function () {
    describe("with single fetch", function () {
      beforeEach(function () {
        this.fetchOptions = { status: "current", sort: "start_at", size: 9 }
        this.collection = new PartnerShows()
        return (this.view = new FixedCellsCountCarousel({
          partner: this.partner,
          collection: this.collection,
          fetchOptions: this.fetchOptions,
          template: sinon.stub(),
        }))
      })

      it("makes proper requests to fetch collection", function () {
        let requests
        this.view.fetch()
        ;(requests = Backbone.sync.args).should.have.lengthOf(1)
        requests[0][1].url.should.endWith(this.collection.url)
        return requests[0][2].data.should.eql(this.fetchOptions)
      })

      it("returns a thenable promise", function () {
        return _.isFunction(this.view.fetch().then).should.be.ok()
      })

      return it("fetches and returns collection", function () {
        const shows = [fabricate("show"), fabricate("show"), fabricate("show")]
        Backbone.sync
          .onCall(0)
          .yieldsTo("success", shows)
          .returns(Promise.resolve(shows))

        return this.view.fetch().then(collection => {
          collection.length.should.equal(3)
          _.pluck(collection.models, "attributes").should.deepEqual(shows)
          return collection.models.should.deepEqual(this.collection.models)
        })
      })
    })

    return describe("with multiple fetch", function () {
      beforeEach(function () {
        this.fetchOptions = [
          { status: "current", sort: "start_at" },
          { status: "closed", sort: "-end_at" },
        ]
        this.collection = new PartnerShows()
        return (this.view = new FixedCellsCountCarousel({
          partner: this.partner,
          collection: this.collection,
          fetchOptions: this.fetchOptions,
          template: sinon.stub(),
        }))
      })

      it("makes proper requests to fetch collection", function () {
        let requests
        this.view.fetch()
        ;(requests = Backbone.sync.args).should.have.lengthOf(2)
        requests[0][1].url.should.endWith(this.collection.url)
        requests[0][2].data.should.eql(this.fetchOptions[0])
        requests[1][1].url.should.endWith(this.collection.url)
        return requests[1][2].data.should.eql(this.fetchOptions[1])
      })

      it("returns a thenable promise", function () {
        return _.isFunction(this.view.fetch().then).should.be.ok()
      })

      it("fetches and returns collection", function () {
        const shows1 = [fabricate("show"), fabricate("show"), fabricate("show")]
        const shows2 = [fabricate("show"), fabricate("show")]
        Backbone.sync
          .onCall(0)
          .yieldsTo("success", shows1)
          .returns(Promise.resolve(shows1))

        Backbone.sync
          .onCall(1)
          .yieldsTo("success", shows2)
          .returns(Promise.resolve(shows2))

        return this.view.fetch().then(collection => {
          collection.length.should.equal(5)
          _.pluck(collection.models, "attributes").should.deepEqual(
            shows1.concat(shows2)
          )
          return collection.models.should.deepEqual(this.collection.models)
        })
      })

      it("works with articles", function () {
        const articles1 = { results: [fabricate("article")] }
        const articles2 = { results: [fabricate("article")] }
        Backbone.sync
          .onCall(0)
          .yieldsTo("success", articles1)
          .returns(Promise.resolve(articles1))

        Backbone.sync
          .onCall(1)
          .yieldsTo("success", articles2)
          .returns(Promise.resolve(articles2))

        return this.view.fetch().then(collection => {
          collection.length.should.equal(2)
          _.pluck(collection.models, "attributes").should.deepEqual(
            articles1.results.concat(articles2.results)
          )
          return collection.models.should.deepEqual(this.collection.models)
        })
      })

      return it("preserves order", function () {
        const shows1 = [fabricate("show"), fabricate("show"), fabricate("show")]
        const shows2 = [fabricate("show"), fabricate("show")]
        Backbone.sync.onCall(0).returns(Promise.resolve(shows1))

        Backbone.sync.onCall(1).returns(Promise.resolve(shows2))

        const promise = this.view.fetch().then(collection => {
          collection.length.should.equal(5)
          _.pluck(collection.models, "attributes").should.deepEqual(
            shows1.concat(shows2)
          )
          return collection.models.should.deepEqual(this.collection.models)
        })
        const resolveFirst = () => Backbone.sync.args[0][2].success(shows1)
        const resolveSecond = () => Backbone.sync.args[1][2].success(shows2)
        resolveSecond()
        resolveFirst()
        return promise
      })
    })
  })

  describe("#consolidate", function () {
    beforeEach(function () {
      return (this.view = new FixedCellsCountCarousel({
        partner: this.partner,
        collection: new PartnerShows(),
        fetchOptions: this.fetchOptions,
        cellsCountPerPage: 1,
        pagesCount: 2,
      }))
    })

    it("returns a collection", function () {
      const collection = new PartnerShows([fabricate("show")])
      const consolidated = this.view.consolidate(collection)
      return consolidated.should.be.an.instanceOf(PartnerShows)
    })

    it("keeps the first cellsCountPerPage * pagesCount items", function () {
      const collection = new PartnerShows([
        fabricate("show"),
        fabricate("show"),
        fabricate("show"),
      ])
      const consolidated = this.view.consolidate(collection)
      consolidated.should.have.lengthOf(2)
      return consolidated.models.should.eql(collection.first(2))
    })

    return it("keeps all the items if containing fewer than cellsCountPerPage * pagesCount items", function () {
      const collection = new PartnerShows([fabricate("show")])
      const consolidated = this.view.consolidate(collection)
      consolidated.should.have.lengthOf(1)
      return consolidated.models.should.eql(collection.models)
    })
  })

  return describe("#initCarousel", function () {
    beforeEach(function () {
      FixedCellsCountCarousel.__set__(
        "initCarousel",
        (this.initCarousel = sinon.stub())
      )
      this.collection = new PartnerShows()
      this.view = new FixedCellsCountCarousel({
        partner: this.partner,
        collection: this.collection,
        fetchOptions: this.fetchOptions,
        cellsCountPerPage: 2,
        template: (this.template = sinon.stub()),
      })
      return sinon.stub(this.view, "remove")
    })

    afterEach(function () {
      return this.view.remove.restore()
    })

    it("removes the view if no collection", function () {
      this.view.initCarousel()
      return this.view.remove.calledOnce.should.be.ok()
    })

    it("removes the view if empty collection", function () {
      this.view.initCarousel(new PartnerShows())
      return this.view.remove.calledOnce.should.be.ok()
    })

    describe("carousel displayable", function () {
      before(function () {
        return (this.collection = new PartnerShows(
          _.map([1, 2, 3], () => fabricate("show"))
        ))
      })

      it("renders the template with carousel nav", function () {
        this.view.initCarousel(this.collection)
        this.template.calledOnce.should.be.ok()
        return this.template
          .calledWithExactly({ collection: this.collection, displayNav: true })
          .should.be.ok()
      })

      return it("initializes the carousel", function () {
        this.view.initCarousel(this.collection)
        return this.initCarousel.calledOnce.should.be.ok()
      })
    })

    return describe("carousel not displayable", function () {
      before(function () {
        return (this.collection = new PartnerShows(
          _.map([1, 2], () => fabricate("show"))
        ))
      })

      it("does not render carousel nav", function () {
        this.view.initCarousel(this.collection)
        this.template.calledOnce.should.be.ok()
        return this.template
          .calledWithExactly({ collection: this.collection, displayNav: false })
          .should.be.ok()
      })

      return it("does initialize the carousel", function () {
        this.view.initCarousel(this.collection)
        return this.initCarousel.called.should.not.be.ok()
      })
    })
  })
})
