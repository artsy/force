/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const sinon = require("sinon")
const rewire = require("rewire")
const proxyToReflection = rewire("../../../lib/middleware/proxy_to_reflection")

describe("proxyToReflection", function () {
  beforeEach(function () {
    this.req = { query: {} }
    this.res = {}
    this.next = sinon.stub()
    this.request = sinon.stub()
    this.request.returns(this.request)
    this.request.head = sinon.stub().returns(this.request)
    this.request.end = sinon.stub().returns(this.request)
    proxyToReflection.__set__("request", this.request)
    proxyToReflection.__set__("proxy", (this.proxy = { web: sinon.stub() }))
    return proxyToReflection.__set__("REFLECTION_URL", "reflection.url")
  })

  it("passes through when there is no escaped fragment query param", function () {
    this.req.query._escaped_fragment_ = null
    proxyToReflection(this.req, this.res, this.next)
    return this.next.called.should.be.ok()
  })

  it("passes through if reflection fails", function () {
    this.req.query._escaped_fragment_ = null
    const err = new Error("Unauthorized")
    err.status = 403
    this.request.end.callsArgWith(0, err)
    proxyToReflection(this.req, this.res, this.next)
    return this.next.called.should.be.ok()
  })

  return context("with _escaped_fragment_", function () {
    const paths = {
      "/artwork/foo-bar?_escaped_fragment_=": "/artwork/foo-bar",
      "/artwork/foo-bar?a=b&c=d&_escaped_fragment_=":
        "/artwork/foo-bar%3Fa%3Db%26c%3Dd",
      "/artwork/foo-bar?a=b&c=d%3Ae&_escaped_fragment_=":
        "/artwork/foo-bar%3Fa%3Db%26c%3Dd%3Ae",
    }

    return (() => {
      const result = []
      for (let source in paths) {
        let dest = paths[source]
        result.push(
          it(`proxies ${source} to ${dest}`, function () {
            this.req.url = source
            this.req.query._escaped_fragment_ = ""
            this.request.end.callsArg(0)
            proxyToReflection(this.req, this.res, this.next)
            const options = this.proxy.web.args[0][2]
            return options.target.should.equal(`reflection.url${dest}`)
          })
        )
      }
      return result
    })()
  })
})
