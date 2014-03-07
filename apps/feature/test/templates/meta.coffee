fs            = require 'fs'
jade          = require 'jade'
{ fabricate } = require 'antigravity'
Feature       = require '../../../../models/feature'

describe 'Meta tags', ->

  describe 'Feature', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
        ARTSY_URL : "http://localhost:5000"
      @file = "#{process.cwd()}/apps/feature/templates/meta.jade"
      @feature = new Feature fabricate('feature')
      @feature.href = -> ''
      @html = jade.render fs.readFileSync(@file).toString(),
        sd     : @sd
        feature: @feature

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@sd.ARTSY_URL}#{@feature.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@sd.ARTSY_URL}#{@feature.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@feature.metaTitle()}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@feature.metaDescription()}"
