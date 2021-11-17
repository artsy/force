import { extend } from "underscore"
import fs from "fs"
import jade from "jade"
import moment from "moment"
import path from "path"
import jsonData from "./fixture"

const markdown = require("../../../components/util/markdown")
const { OrderedSets } = require("../../../collections/ordered_sets")

describe.skip("landing page", () => {
  let data

  const render = (filename, data) => {
    const file = `${path.resolve(__dirname, "../")}/templates/${filename}.jade`
    return jade.compile(fs.readFileSync(file), { filename: file })(data)
  }

  beforeAll(() => {
    data = extend(jsonData, {
      asset: () => {
        // noop
      },
      inDemand: new OrderedSets([]),
      markdown,
      moment,
      recentlySold: [],
      sales: [],
      sd: {},
    })
  })

  it("hides the upcoming sales section if there are no sales", () => {
    const html = render("landing", data)
    html.should.not.containEql("consignments-upcoming-sales__sales__sale")
  })

  it("hides the upcoming sales section if sales is null", () => {
    data.sales = null
    const html = render("landing", data)
    html.should.not.containEql("consignments-upcoming-sales__sales__sale")
  })

  it("shows the upcoming sales section if there is a sale", () => {
    data.sales = [{ name: "Sarah Evening Sale", start_at: moment.now() }]
    const html = render("landing", data)
    html.should.containEql("consignments-upcoming-sales__sales__sale")
  })

  it("can render question sections with markdown", () => {
    const html = render("landing", data)
    html.should.containEql('collection-artsy">buy and sell</a>')
  })
})
