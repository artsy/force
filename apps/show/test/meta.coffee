fs            = require 'fs'
jade          = require 'jade'
{ fabricate } = require 'antigravity'
PartnerShow   = require '../../../models/partner_show'

describe 'Meta tags', ->

  describe 'Partner Show', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
      @file = "#{process.cwd()}/apps/show/meta.jade"
      @show = new PartnerShow fabricate('show')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        show: @show

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@show.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@show.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@show.metaTitle()} | Artsy"
