_ = require 'underscore'
sinon = require 'sinon'
moment = require 'moment'
rewire = require 'rewire'
Q = require 'bluebird-q'
{ fabricate } = require '@artsy/antigravity'
routes = rewire '../routes'
ViewHelpers = require '../helpers/view_helpers.coffee'

describe 'Fairs routes', ->
  beforeEach ->
    image = { url: "https://www.example.com/cat.jpg" }
    profile = { is_published: true, icon: { url: "https://www.example.com/cat.jpg" } }
    @currentFairs = _.times 2, ->
      fabricate('fair', image: image, profile: profile, id: _.uniqueId(), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), start_at: moment().subtract(1, 'days'), end_at: moment().add(11, 'days').format(), banner_size: 'x-large')
    @pastFairs = _.times 4, ->
      fabricate('fair', image: image, profile: profile, id: _.uniqueId('past'), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(11, 'days').format())
    @upcomingFairs = _.times 3, ->
      fabricate('fair', id: _.uniqueId('upcoming'), is_published: true, has_full_feature: true, has_listing: true, organizer: null, end_at: moment().add(11, 'days'), start_at: moment().add(1, 'days'))


    @rows = ViewHelpers.fillRows @currentFairs

    # Eligible fairs have published profiles
    # also need to unset in_row from filling the rows
    _.map _.flatten([@currentFairs, @pastFairs]), (fair) ->
      delete fair.in_row

  describe '#index', ->
    describe 'with active current fairs', ->
      beforeEach ->
        @res = render: sinon.stub(), locals: sd: sinon.stub()
        @fairs = _.flatten [
          @currentFairs
          @pastFairs
          @upcomingFairs
        ]
        routes.__set__ 'metaphysics', => Q.resolve { featured_fairs: [ fairs: {} ], fairs: @fairs }

      it 'fetches the fairs and renders the index template', ->
        routes.index {}, @res
          .then =>
            @res.render.args[0][1].currentFairRows.should.eql @rows
            @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
            @res.render.args[0][1].pastFairs.should.eql @pastFairs

    describe 'with no current fairs', ->
      beforeEach ->
        @res = render: sinon.stub(), locals: sd: sinon.stub()
        @fairs = _.flatten [
          @pastFairs
          @upcomingFairs
        ]
        routes.__set__ 'metaphysics', => Q.resolve { featured_fairs: [ fairs: {} ], fairs: @fairs }

      it 'fetches the fairs and renders the index template', ->
        routes.index {}, @res
          .then =>
            @res.render.args[0][1].currentFairRows.should.eql []
            @res.render.args[0][1].upcomingFairs.should.eql @upcomingFairs
            @res.render.args[0][1].pastFairs.should.eql @pastFairs
