_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sinon = require 'sinon'
Backbone = require 'backbone'
moment = require 'moment'
rewire = require 'rewire'
routes = rewire '../routes'
Q = require 'bluebird-q'

class OrderedSetsFixture extends Backbone.Collection
  fetchAll: -> then: (cb) -> cb()
routes.__set__ 'OrderedSets', OrderedSetsFixture

describe '#index', ->

  beforeEach ->
    profile = { is_published: true, icon: { url: "https://www.example.com/cat.jpg" } }
    unpublished_profile = { is_published: false, icon: { url: "https://www.example.com/cat.jpg" } }
    @currentFairs = _.times 2, ->
      fabricate('fair', profile: profile, id: _.uniqueId('current'), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days'))
    @pastFairs = _.times 4, ->
      fabricate('fair', profile: profile, id: _.uniqueId('past'), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days'))
    @upcomingFairs = _.times 3, ->
      fabricate('fair', profile: unpublished_profile, id: _.uniqueId('upcoming'), is_published: true, has_full_feature: true, has_listing: true, organizer: null, end_at: moment().add(10, 'days'))

  describe 'with fairs', ->

    beforeEach ->
      @res = render: sinon.stub(), locals: sd: sinon.stub()
      @fairs = _.flatten [
        @currentFairs
        @pastFairs
        @upcomingFairs
      ]
      routes.__set__ 'metaphysics', => Q.resolve { fairs: @fairs }

    it 'fetches the fairs and renders the index template', ->
      routes.index {}, @res
        .then =>
          @res.render.args[0][1].currentFairs.should.eql @currentFairs
          @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
          @res.render.args[0][1].pastFairs.should.eql @pastFairs
