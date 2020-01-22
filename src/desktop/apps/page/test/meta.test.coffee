fs = require 'fs'
jade = require 'jade'
path = require 'path'
Page = require '../../../models/page'
{ fabricate } = require '@artsy/antigravity'

describe 'Meta tags', ->

  describe 'press page', ->

    before ->
      @file = "#{path.resolve __dirname, '../'}/meta/press.jade"
      @sd =
        MOBILE_MEDIA_QUERY: 'mobile-media-query'
        APP_URL: 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/press"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/press"
      @html.should.containEql "<meta property=\"og:title\" content=\"Press | Artsy"

  describe 'terms page', ->

    before ->
      @file = "#{path.resolve __dirname, '../'}/meta/terms.jade"
      @sd =
        MOBILE_MEDIA_QUERY: 'mobile-media-query'
        APP_URL: 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/terms"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/terms"
      @html.should.containEql "<meta property=\"og:title\" content=\"Terms of Use | Artsy"

  describe 'privacy page', ->

    before ->
      @file = "#{path.resolve __dirname, '../'}/meta/privacy.jade"
      @sd =
        MOBILE_MEDIA_QUERY: 'mobile-media-query'
        APP_URL: 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/privacy"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/privacy"
      @html.should.containEql "<meta property=\"og:title\" content=\"Privacy Policy | Artsy"

  describe 'security page', ->

    before ->
      @file = "#{path.resolve __dirname, '../'}/meta/security.jade"
      @sd =
        MOBILE_MEDIA_QUERY: 'mobile-media-query'
        APP_URL: 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<link rel=\"canonical\" href=\"http://localhost:5000/security"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/security"
      @html.should.containEql "<meta property=\"og:title\" content=\"Security | Artsy"
