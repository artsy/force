fs = require 'fs'
jade = require 'jade'

describe 'Meta tags', ->
  describe 'browse page', ->
    before ->
      @file = "#{process.cwd()}/apps/collect/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(),
        sd:
          CANONICAL_MOBILE_URL: 'http://m.localhost:5000'
          MOBILE_MEDIA_QUERY: 'mobile-media-query'
          APP_URL: 'http://localhost:5000'
        asset: (->)

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.containEql "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/collect"
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/collect"
      @html.should.containEql "<meta property=\"og:title\" content=\"Browse | Artsy"
