fs = require 'fs'
jade = require 'jade'
path = require 'path'

describe 'Meta tags', ->
  describe 'browse page', ->
    before ->
      @file = "#{path.resolve __dirname, '../'}/templates/meta.jade"
      @html = jade.render fs.readFileSync(@file).toString(),
        sd:
          MOBILE_URL: 'http://m.localhost:5000'
          MOBILE_MEDIA_QUERY: 'mobile-media-query'
          APP_URL: 'http://localhost:5000'
          COLLECT_PAGE_TITLE: 'Crazy cool art for Sale'
        asset: (->)

    it 'includes canonical, twitter card and og tags', ->
      @html.should.containEql "<meta property=\"twitter:card\" content=\"summary"
      @html.should.containEql "<meta property=\"og:url\" content=\"http://localhost:5000/collect"
      @html.should.containEql "<meta property=\"og:title\" content=\"Crazy cool art for Sale"
