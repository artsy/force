jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ fabricate }   = require 'antigravity'
Profile         = require '../../../models/profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Partner header', ->
  describe 'canonical links', ->
    beforeEach ->
      @profile = new Profile fabricate 'profile'

    it 'has a canonical link to the full artist page on partner artist pages', ->
      @template = render('index')(
        profile: @profile
        sd:
          APP_URL: 'http://localhost:3004'
          CURRENT_PATH: '/pace-gallery'
        params:
          id: 'pace-gallery'
          artistId: 'yoshitomo-nara'
      )
      @template.should.include '<link rel="canonical" href="http://localhost:3004/artist/yoshitomo-nara">'

    it 'has a canonical link to current url on other pages', ->
      @template = render('index')(
        profile: @profile
        sd:
          APP_URL: 'http://localhost:3004'
          CURRENT_PATH: '/pace-gallery'
        params:
          id: 'pace-gallery'
      )
      @template.should.include '<link rel="canonical" href="http://localhost:3004/pace-gallery">'
