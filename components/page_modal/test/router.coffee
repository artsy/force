benv = require 'benv'
Backbone = require 'backbone'
PageModalRouter = require '../router'

describe 'PageModalRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @router = new PageModalRouter {
      'artist/:id': 'close'
      'artwork/:id': 'modal'
    }

  it 'sets up the passed in routes', ->
    Backbone.history.should.have.property('handlers').with.lengthOf 2
    Backbone.history.handlers[0].route.should.containEql /artist/
    Backbone.history.handlers[1].route.should.containEql /artwork/

  describe '#__src__', ->
    describe 'bare path', ->
      beforeEach ->
        Backbone.history.fragment = 'artwork/foobar'

      it 'appends a modal query string when constructing the src for the page modal iframe', ->
        @router.__src__().should.equal '/artwork/foobar?modal=true'

    describe 'path with query string', ->
      beforeEach ->
        Backbone.history.fragment = 'artwork/foobar?fair_id=barbaz&sale_id=bazqux'

      it 'non-destructively appends a modal query string when constructing the src for the page modal iframe', ->
        @router.__src__().should.equal '/artwork/foobar?fair_id=barbaz&sale_id=bazqux&modal=true'
