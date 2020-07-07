import sinon from "sinon"
import App from "desktop/apps/categories/components/App"

const rewire = require("rewire")("../routes")
const { index } = rewire

let req
let res
let next
let geneFamiliesQuery
let stitch

describe("#index", () => {
  beforeEach(() => {
    req = {
      app: {
        get: sinon.stub().withArgs("views").returns("components"),
      },
    }
    res = {}
    next = sinon.stub()
    geneFamiliesQuery = {
      gene_families: {
        edges: [
          {
            node: {
              id: "materials",
              name: "Materials",
              genes: [
                {
                  id: "silver",
                  name: "Silver",
                },
                {
                  id: "gold",
                  name: "Gold",
                },
              ],
            },
          },
        ],
      },
    }

    rewire.__set__(
      "metaphysics2",
      sinon.stub().returns(Promise.resolve(geneFamiliesQuery))
    )

    stitch = sinon.stub()
    rewire.__set__("stitch", stitch)
  })

  it("renders the categories app", () => {
    index(req, res, next).then(() => {
      stitch.args[0][0].blocks.body.should.equal(App)
      stitch.args[0][0].locals.assetPackage.should.equal("categories")
    })
  })
  it("passes the correct variables", () => {
    index(req, res, next).then(() => {
      const expectedFamilies = [
        {
          id: "materials",
          name: "Materials",
          genes: [
            {
              id: "silver",
              name: "Silver",
            },
            {
              id: "gold",
              name: "Gold",
            },
          ],
        },
      ]
      stitch.args[0][0].data.geneFamilies.should.eql(expectedFamilies)
    })
  })
})
