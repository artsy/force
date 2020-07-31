/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const routes = rewire("../routes")

const send = null
const json = null

describe("About routes", () =>
  describe("#index", function () {
    beforeEach(function () {
      this.res = {
        redirect: sinon.stub(),
        locals: { sd: { IS_MOBILE: true } },
        render: sinon.stub(),
      }
      return routes.__set__(
        "JSONPage",
        sinon.stub().returns({
          get: sinon.stub().callsArgWith(0, null, { sections: [] }),
        })
      )
    })

    it("redirects to buying-with-artsy if it is mobile", function () {
      routes.index({}, this.res)
      return this.res.redirect.args[0].should.eql(["/buying-with-artsy"])
    })

    return it("doesnt redirect if not mobile", function () {
      this.res.locals.sd.IS_MOBILE = false
      routes.index({}, this.res)
      this.res.redirect.called.should.not.be.ok()
      return this.res.render.called.should.be.ok()
    })
  }))
