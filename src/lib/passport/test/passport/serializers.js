const Backbone = require("backbone")
const rewire = require("rewire")
const sinon = require("sinon")
const serializers = rewire("../../lib/passport/serializers")
const { serialize, deserialize } = serializers

describe("#serialize", function () {
  let request

  beforeEach(function () {
    request = {}
    request.get = sinon.stub().returns(request)
    request.set = sinon.stub().returns(request)
    request.end = sinon.stub().returns(request)
    serializers.__set__("request", request)
    this.resolveSerialize = () => {
      request.end.args[0][0](null, { body: { id: "craig", foo: "baz" } })
      request.end.args[1][0](null, { body: [{ provider: "facebook" }] })
    }
  })

  it("only stores select data in the session", function (done) {
    const user = new Backbone.Model({ id: "craig", foo: "baz", bam: "bop" })
    serialize(user, function (err, data) {
      ;(data.foo != null).should.not.be.ok
      data.id.should.equal("craig")
      done()
    })
    this.resolveSerialize()
  })

  it("add authentications", function (done) {
    const user = new Backbone.Model({ id: "craig", foo: "baz", bam: "bop" })
    serialize(user, function (err, data) {
      data.authentications[0].provider.should.equal("facebook")
      done()
    })
    this.resolveSerialize()
  })

  it("works when theres an error from Gravity", function (done) {
    const user = new Backbone.Model({ id: "craig", foo: "baz", bam: "bop" })
    serialize(user, function (err) {
      err.message.should.equal("fail")
      done()
    })
    request.end.args[0][0](null, { body: { id: "craig", foo: "baz" } })
    request.end.args[1][0](new Error("fail"), null)
  })
})

describe("#deserialize", function () {
  it("wraps the user data in a model", function (done) {
    let User
    serializers.__set__("opts", {
      CurrentUser: (User = class User {
        constructor(attrs) {
          this.attrs = attrs
        }
      }),
    })
    deserialize({ id: "craig", name: "Craig" }, function (err, user) {
      user.attrs.name.should.equal("Craig")
      done()
    })
  })
})
