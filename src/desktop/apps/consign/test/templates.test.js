import { extend } from "underscore"
import fs from "fs"
import jade from "jade"
import moment from "moment"
import path from "path"
import jsonData from "./fixture.json"
import markdown from "../../../components/util/markdown"
import OrderedSets from "../../../collections/ordered_sets"

describe("landing page", () => {
  let data

  const render = (filename, data) => {
    const file = `${path.resolve(__dirname, "../")}/templates/${filename}.jade`
    return jade.compile(fs.readFileSync(file), { filename: file })(data)
  }

  before(() => {
    data = extend(jsonData, {
      asset: () => {},
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
