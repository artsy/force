fs = require 'fs'
jade = require 'jade'
path = require 'path'
{ fabricate } = require '@artsy/antigravity'
Feature = require '../../../../models/feature'

describe 'Meta tags', ->

  describe 'Feature', ->

    before ->
      @sd =
        APP_URL: "http://localhost:5000"
      @file = "#{path.resolve __dirname, '../../'}/templates/meta.jade"
      @feature = new Feature fabricate('feature')
      @feature.href = -> ''
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        feature: @feature

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"#{@sd.APP_URL}#{@feature.href()}"
      @html.should.containEql "<meta property=\"og:url\" content=\"#{@sd.APP_URL}#{@feature.href()}"
      @html.should.containEql "<meta property=\"og:title\" content=\"#{@feature.toPageTitle()}"
      @html.should.containEql "<meta property=\"og:description\" content=\"#{@feature.toPageDescription()}"
