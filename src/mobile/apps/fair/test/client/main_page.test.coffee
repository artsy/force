_ = require 'underscore'
Backbone = require 'backbone'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
benv = require 'benv'
{ resolve } = require 'path'

describe 'Main page client-side code', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.onInfiniteScroll = ->
      sinon.stub Backbone.history, 'start'
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/main_page.jade'), {
        fair: new Fair(fabricate 'fair')
        profile: new Profile(fabricate 'profile')
        sections: new Backbone.Collection([
          {
            "section": "FOCUS"
            "partner_shows_count": 13
          }
          {
            "section": "Pier 92"
            "partner_shows_count": 42
          }
        ]).models
        byPriceHash: { '1:1000': "Under $1,000" }
        sd: {}
      }, =>
        { FairMainPageView } = benv.requireWithJadeify resolve(__dirname, '../../client/main_page'),
          ['featuredLinksTemplate', 'primarySetTemplate', 'imageNavItemTemplate']
        @view = new FairMainPageView
          el: $ 'body'
          model: new Fair(fabricate 'fair')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()
    Backbone.history.start.restore()

  describe 'FairMainPageView', ->

    describe '#renderFeaturedLinks', ->

      it 'fetches the fairs sets', ->
        @view.renderFeaturedLinks()
        _.last(Backbone.sync.args)[2].url.should.containEql '/sets?owner_type=Fair'

      it 'renders the featured links', ->
        @view.renderFeaturedLinks()
        _.last(Backbone.sync.args)[2].success([fabricate('set', key: 'editorial', display_on_martsy: true)])
        _.last(Backbone.sync.args)[2].success([
          fabricate 'featured_link', title: 'Featured link for this awesome page', display_on_martsy: true
        ])
        @view.$el.html().should.containEql 'Featured link for this awesome page'
