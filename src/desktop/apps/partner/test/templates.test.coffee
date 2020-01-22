jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../models/profile'

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
        sd: APP_URL: 'http://localhost:3004', CURRENT_PATH: '/pace-gallery'
        asset: (->)
        params: id: 'pace-gallery', artistId: 'yoshitomo-nara'
      )
      @template.should.containEql '<link rel="canonical" href="http://localhost:3004/artist/yoshitomo-nara">'

    it 'has a canonical link to current url on other pages', ->
      @template = render('index')(
        profile: @profile
        sd: APP_URL: 'http://localhost:3004', CURRENT_PATH: '/pace-gallery'
        asset: (->)
        params: id: 'pace-gallery'
      )
      @template.should.containEql '<link rel="canonical" href="http://localhost:3004/pace-gallery">'

    it 'has meta fragment', ->
      @template = render('index')(
        profile: @profile
        sd: APP_URL: 'http://localhost:3004', CURRENT_PATH: '/pace-gallery', INCLUDE_ESCAPED_FRAGMENT: true
        asset: (->)
        params: id: 'pace-gallery'
      )
      @template.should.containEql '<meta name="fragment" content="!">'

    it 'does not have meta fragment if tab is included', ->
      @template = render('index')(
        profile: @profile
        tab: 'overview'
        sd:
          APP_URL: 'http://localhost:3004', CURRENT_PATH: '/pace-gallery', INCLUDE_ESCAPED_FRAGMENT: true
        asset: (->)
        params: id: 'pace-gallery'
      )
      @template.should.not.containEql '<meta name="fragment" content="!">'

    describe 'followers', ->
      describe 'galleries', ->
        it 'does not display follower count', ->
          @profile.set owner_type: 'PartnerGallery', follows_count: 999
          @template = render('index')(
            profile: @profile
            tab: 'overview'
            sd: APP_URL: 'http://localhost:3004', CURRENT_PATH: '/pace-gallery'
            asset: (->)
            params: id: 'pace-gallery'
          )
          @template.should.not.containEql 'partner-followers'

      describe 'institutions', ->
        beforeEach ->
          @profile = new Profile fabricate 'profile', owner_type: 'PartnerInstitution'

        it 'does not display follower count', ->
          @profile.set follows_count: 2222
          @template = render('index')(
            profile: @profile
            tab: 'overview'
            sd: APP_URL: 'http://localhost:3004', CURRENT_PATH: '/philadelphia-museum-of-art'
            asset: (->)
            params: id: 'philadelphia-museum-of-art'
          )
          @template.should.not.containEql 'partner-followers'
