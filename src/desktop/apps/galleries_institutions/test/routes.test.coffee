{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
routes = rewire '../routes'
Profile = require '../../../models/profile.coffee'

describe 'galleries_institutions routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  context '#index', ->
    context 'fetch categorized partners', ->
      beforeEach ->
        @req = { body: {}, query: {}, params: { type: 'galleries' } }
        @res = { render: sinon.stub(), locals: { sd: {} } }
        @next = sinon.stub()
        @partner = {
          id: 'arndt', name: 'ARNDT', initials: 'A', locations: [],
          profile: { id: 'arndt', href: '/arndt', image: null }
        }

      it 'ignores categories without partners in primary or secondary bucket', ->
        partner_categories = [
          {
            name: '20th Century Design', id: '20th-century-design',
            primary: [@partner], secondary: [@partner, @partner]
          },
          {
            name: 'African Art', id: 'african-art',
            primary: [], secondary: []
          },
          {
            name: 'Contemporary', id: 'contemporary',
            primary: [@partner], secondary: [@partner]
          }
        ]
        routes.__set__ 'fetchPrimaryCarousel', -> new Backbone.Collection()
        routes.__set__ 'fetchPartnerCategories', (fetchPartnerCategories = sinon.stub())

        filterPartnerCategories = routes.__get__ 'filterPartnerCategories'

        fetchPartnerCategories.returns new Promise (resolve, reject) ->
          resolve filterPartnerCategories(partner_categories: partner_categories)

        routes.index(@req, @res, @next).then =>
          @res.render.calledOnce.should.be.ok()
          @res.render.args[0][1].categories.should.have.lengthOf 2
