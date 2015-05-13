jade = require 'jade'
fs = require 'fs'
Profile = require '../../../models/profile'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

render = (template) ->
  filename = resolve __dirname, template
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Main layout template', ->

  it 'includes the sharify script', ->
    render('../templates/index.jade')(
      sd: { BROWSER: {} }, sharify: { script: -> 'foobar' }, asset: ((p) -> p)
    ).should.containEql '/assets/analytics.js'

  it 'excludes analytics for phantom', ->
    render('../templates/index.jade')(
      sd: { BROWSER: { family: 'PhantomJS' } }
      sharify: { script: -> 'foobar' }
      asset: ((p) -> p)
    ).should.not.containEql '/assets/analytics.js'

describe 'Meta tags', ->

  describe 'Profile', ->

    before ->
      @sd =
        API_URL: "http://localhost:5000"
        CURRENT_PATH: '/cool-profile/info'
      @file = resolve __dirname, "../templates/profile_meta.jade"
      @profile = new Profile fabricate('profile')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        profile: @profile

    it 'includes canonical url, twitter card, og tags, and title and respects current_path', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"#{@sd.APP_URL}/cool-profile/info"
      @html.should.containEql "<meta property=\"og:url\" content=\"#{@sd.APP_URL}/cool-profile/info"
      @html.should.containEql "<meta property=\"og:title\" content=\"#{@profile.metaTitle()}"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@profile.metaDescription()}"

describe 'Head template', ->
  describe 'IS_RESPONSIVE', ->
    it 'renders whether or not there is a user agent', ->
      render('../templates/head.jade')(sd: { IS_RESPONSIVE: true }, asset: (->))
