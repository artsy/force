fs            = require 'fs'
jade          = require 'jade'
{ fabricate } = require 'antigravity'
Profile          = require '../../../models/profile'

describe 'Meta tags', ->

  describe 'Profile', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
        ARTSY_URL: "http://localhost:5000"
        CURRENT_PATH: '/cool-profile/info'
      @file = "#{process.cwd()}/apps/profile/templates/meta.jade"
      @profile = new Profile fabricate('profile')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        profile: @profile

    it 'includes canonical url, twitter card, og tags, and title and respects current_path', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@sd.APP_URL}/cool-profile/info"
      @html.should.include "<meta property=\"og:url\" content=\"#{@sd.APP_URL}/cool-profile/info"
      @html.should.include "<meta property=\"og:title\" content=\"#{@profile.metaTitle()}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@profile.metaDescription()}"
