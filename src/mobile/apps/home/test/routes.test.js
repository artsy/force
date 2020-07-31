/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const _ = require("underscore")
const sinon = require("sinon")
const rewire = require("rewire")
const routes = rewire("../routes")

describe("#index", function () {
  beforeEach(function () {
    this.req = {}
    this.res = { render: sinon.stub(), locals: { sd: {} } }
    this.next = sinon.stub()
    routes.__set__("metaphysics", (this.metaphysics = sinon.stub()))
    return this.metaphysics.returns(
      Promise.resolve({
        homePage: {
          heroUnits: [
            {
              title: "Foo",
            },
          ],
        },
      })
    )
  })

  return it("renders the hero units", function (done) {
    routes.index(this.req, this.res, this.next)
    return _.defer(() => {
      this.res.render.args[0][1].heroUnits[0].title.should.equal("Foo")
      return done()
    })
  })
})
