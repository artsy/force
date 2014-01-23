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
      @file = "#{process.cwd()}/apps/profile/meta.jade"
      @profile = new Profile fabricate('profile')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        profile: @profile

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@sd.ARTSY_URL}#{@profile.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@sd.ARTSY_URL}#{@profile.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@profile.metaTitle()}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@profile.metaDescription()}"
