jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
cheerio = require 'cheerio'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Show = require '../../../../models/show'
Location = require '../../../../models/location'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'hours page', ->
  describe 'show with day schedules', ->
    before ->
      @show = new Show fabricate 'show'
      @template = render('hours')(
        location: new Location fabricate 'location', day_schedules: [
          {
          _id: "55919db972616960090000a3",
          start_time: 36000,
          end_time: 42000,
          day_of_week: "Monday"
          },
          {
          _id: "55919db87261690a0d00008e",
          start_time: 54000,
          end_time: 68400,
          day_of_week: "Monday"
          }
        ]
        sd: {}
      )

    it 'displays correctly formatted hours for days with schedules', ->
      $ = cheerio.load @template
      $.html().should.containEql "<p>Monday</p><p>10am &#x2014; 11:40am, 3pm &#x2014; 7pm</p>"

    it 'displays "closed" for days without schedules', ->
      $ = cheerio.load @template
      $.html().should.containEql "<p>Tuesday &#x2014; Sunday</p><p>Closed</p>"
