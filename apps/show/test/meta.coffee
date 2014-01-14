fs          = require 'fs'
jade        = require 'jade'
PartnerShow = require '../../../models/partner_show'

describe 'Meta tags', ->

  describe 'Partner Show', ->

    before ->
      @sd =
        ASSET_PATH: "http://localhost:5000"
      @file = "#{process.cwd()}/apps/show/meta.jade"
      @show = new PartnerShow
        id: 'gagosian-gallery-inez-and-vinoodh'
        location:
          id: '51df5e068b3b815b62000012'
          name: 'Location 4'
          address: '456 North Camden Drive'
          address_2: ''
          city: 'Beverly Hills'
          country: 'United States'
          state: 'CA'
          postal_code: '90201'
          phone: '1 (310) 271-9400'
          coordinates: null
          position: 4
          email: ''
          fax: ''
          publicly_viewable: true
        partner:
          id: 'gagosian-gallery'
          default_profile_id: 'gagosian-gallery'
          default_profile_public: true
          sortable_id: 'gagosian-gallery'
          type: 'Gallery'
          name: 'Gagosian Gallery'
          website: 'http://www.gagosian.com'
          has_full_profile: true
        name: 'Inez & Vinoodh'
        image_url: '/local/partner_show_images/51f6a51d275b24a787000c36/1/:version.jpg'
        image_versions: [ 'medium', 'tall', 'large', 'larger', 'featured', 'general' ]
        start_at: '2013-07-12T04:00:00+00:00'
        end_at: '2013-08-23T04:00:00+00:00'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd  : @sd
        show: @show

    it 'includes canonical url, twitter card, og tags, and title', ->
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"#{@show.href()}"
      @html.should.include "<meta property=\"og:url\" content=\"#{@show.href()}"
      @html.should.include "<meta property=\"og:title\" content=\"#{@show.metaTitle()} | Artsy"
