fs = require 'fs'
jade = require 'jade'

describe 'Meta tags', ->

  describe 'featured partners page', ->

    before ->
      @file = "#{process.cwd()}/apps/institutions/meta.jade"
      @sd =
        APP_URL: 'http://localhost:5000'
        ASSET_PATH: 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: @sd

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"http://localhost:5000/institutions"
      @html.should.include "<meta property=\"og:url\" content=\"http://localhost:5000/institutions"
      @html.should.include "<meta property=\"og:title\" content=\"Institutions | Artsy"
