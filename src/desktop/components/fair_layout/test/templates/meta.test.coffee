_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
cheerio = require 'cheerio'

@fair = new Fair fabricate 'fair'
@profile = new Profile fabricate 'fair_profile'

render = (templateName, locals) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  sd =
    APP_URL: 'http://localhost:5000'
    API_URL: 'http://localhost:5000'
    NODE_ENV: 'test'
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
)

describe 'Metatags', ->
  describe 'overview page', ->

    before (done) ->
      sd =
        CURRENT_PATH: '/cool-fair'
        SECTION: 'overview'
        FAIR: fabricate 'fair'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders the default title and description in the root directory', ->
      @$template.html().should.containEql '<title>Armory Show 2013 | Artsy</title>'
      @$template.html().should.containEql '<meta name="description" content="Browse artworks, artists and exhibitors from Armory Show 2013 on Artsy.">'
