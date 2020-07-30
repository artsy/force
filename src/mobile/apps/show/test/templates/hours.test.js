/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const jade = require("jade")
const path = require("path")
const fs = require("fs")
const Backbone = require("backbone")
const cheerio = require("cheerio")
const { resolve } = require("path")
const { fabricate } = require("@artsy/antigravity")
const Show = require("../../../../models/show")
const Location = require("../../../../models/location")

const render = function (templateName) {
  const filename = path.resolve(
    __dirname,
    `../../templates/${templateName}.jade`
  )
  return jade.compile(fs.readFileSync(filename), { filename })
}

describe("hours page", () =>
  describe("show with day schedules", function () {
    before(function () {
      this.show = new Show(fabricate("show"))
      return (this.template = render("hours")({
        location: new Location(
          fabricate("location", {
            day_schedules: [
              {
                _id: "55919db972616960090000a3",
                start_time: 36000,
                end_time: 42000,
                day_of_week: "Monday",
              },
              {
                _id: "55919db87261690a0d00008e",
                start_time: 54000,
                end_time: 68400,
                day_of_week: "Monday",
              },
            ],
          })
        ),
        sd: {},
      }))
    })

    it("displays correctly formatted hours for days with schedules", function () {
      const $ = cheerio.load(this.template)
      return $.html().should.containEql(
        "<p>Monday</p><p>10am &#x2014; 11:40am, 3pm &#x2014; 7pm</p>"
      )
    })

    return it('displays "closed" for days without schedules', function () {
      const $ = cheerio.load(this.template)
      return $.html().should.containEql(
        "<p>Tuesday &#x2014; Sunday</p><p>Closed</p>"
      )
    })
  }))
