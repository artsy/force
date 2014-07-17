fs = require 'fs'
jade = require 'jade'
sd = require('sharify').data
{ fabricate } = require 'antigravity'
PartnerShow = require '../../../models/partner_show'
cheerio = require 'cheerio'

describe 'Meta tags', ->

  describe 'Partner Show', ->

    beforeEach ->
      @file = "#{process.cwd()}/apps/show/meta.jade"
      @show = new PartnerShow fabricate('show')
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: sd
        show: @show

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{sd.APP_URL}#{@show.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{sd.APP_URL}#{@show.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@show.toPageTitle().replace('&', '&amp;')}"
      @html.should.include "<meta property=\"og:description\" content=\"#{@show.toPageDescription()}"

    it 'defaults to the default og:image', ->
      @show = new PartnerShow fabricate('show')
      @show.set 'image_url', ''
      @show.set 'image_version', []
      @html = jade.render fs.readFileSync(@file).toString(),
        sd: sd
        show: @show
      $ = cheerio.load @html
      $("meta[property='og:image']").attr('content').should.include 'og_image.jpg'

    describe 'with a poster image', ->

      it 'links to the poster image for the og:image', ->
        $ = cheerio.load @html
        $("meta[property='og:image']").attr('content').should.equal @show.posterImageUrl()
