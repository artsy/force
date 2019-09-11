_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
CurrentUser = require '../../../../models/current_user'
cheerio = require 'cheerio'

@fair = new Fair fabricate 'fair'
@profile = new Profile fabricate 'fair_profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
)

describe 'Header template', ->
  describe 'Microsite template', ->

    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
        CURRENT_PATH: '/cool-fair'
        PROFILE: fabricate 'fair_profile'
        FAIR: fabricate 'fair', filter_genes: []
        FACEBOOK_APP_NAMESPACE: 'namespace'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      user = new CurrentUser fabricate('user')
      template = render('header')
        sd: sd
        fair: fair
        profile: profile
        user: user
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders the user header', ->
      user = new CurrentUser fabricate 'user'
      @$template.html().should.containEql '/user/saves'

  describe 'logged out', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
        CURRENT_PATH: '/cool-fair'
        PROFILE: fabricate 'fair_profile'
        FAIR: fabricate 'fair', filter_genes: []
        FACEBOOK_APP_NAMESPACE: 'namespace'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      user = undefined
      template = render('header')
        sd: sd
        fair: fair
        profile: profile
        user: user
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'works with out user', ->
      user = undefined

      @$template.html().should.containEql '/log_in'
