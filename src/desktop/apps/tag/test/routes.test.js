/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { fabricate, fabricate2 } = require("@artsy/antigravity")
const _ = require("underscore")
const sinon = require("sinon")
const Backbone = require("backbone")
const routes = require("../routes")

describe("Tag routes", function () {
  beforeEach(function () {
    sinon.stub(Backbone, "sync")
    this.req = {
      params: {
        id: "foo",
      },
    }
    return (this.res = {
      render: sinon.stub(),
      redirect: sinon.stub(),
      locals: {
        sd: {
          APP_URL: "http://localhost:5000",
          CURRENT_PATH: "/artwork/andy-foobar",
        },
      },
    })
  })

  afterEach(() => Backbone.sync.restore())

  return describe("#index", () =>
    xit("bootstraps the tag", function (done) {
      routes.index(this.req, this.res)
      _.last(Backbone.sync.args)[2].success(fabricate("gene", { id: "tag" }))

      return _.defer(() =>
        _.defer(() => {
          this.res.locals.sd.TAG.id.should.equal("tag")
          this.res.render.args[0][0].should.equal("index")
          return done()
        })
      )
    }))
})
