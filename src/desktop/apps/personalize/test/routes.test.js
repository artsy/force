import sinon from "sinon"

const rewire = require("rewire")("../routes")
const { index } = rewire

describe("Personalize routes", () => {
  let req
  let res
  let next
  let stitch

  beforeEach(() => {
    req = {
      body: {},
      params: { slug: "interests" },
      redirect: sinon.stub(),
    }
    res = {
      send: sinon.stub(),
    }
    next = sinon.stub()
  })

  stitch = sinon.stub()
  rewire.__set__("stitch", stitch)

  it("renders the personalize app", () => {
    index(req, res, next).then(() => {
      stitch.args[0][0].data.title.should.eql("Personalize | Artsy")
      stitch.args[0][0].locals.assetPackage.should.eql("onboarding")
    })
  })
})
