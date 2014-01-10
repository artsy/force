benv            = require 'benv'
rewire          = require 'rewire'
Backbone        = require 'backbone'
sinon           = require 'sinon'
Page            = require '../../../models/page.coffee'
mediator        = require '../../../lib/mediator.coffee'
{ fabricate }   = require 'antigravity'
rewire          = require 'rewire'

describe 'AboutRouter', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'components-jquery' }
      Backbone.$ = $
      Backbone.history.start = sinon.stub
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    page = new Page fabricate 'page'
    benv.render '../template.jade', {
      sd: {},
      page: page,
      nav: page
    }, =>
      { @AboutRouter, @init } = mod = rewire '../client'
      class JumpView
        $el: $('<div>jump-to-top</div>')
      mod.__set__ 'JumpView', JumpView
      @router = new @AboutRouter
      # The fabricated page doesnt have nav content; insert an example
      $('#about-page-nav').prepend('<a href="/about/jobs"></a>')
      @init() # Attach click handlers
      done()

  describe 'AboutView', ->

    describe '#initialize', ->

      it 'should render a jump navigation and set its right CSS prop to inherit', ->
        sinon.spy @router.jump.$el, 'css'
        @router.initialize()
        @router.$jumpContainer.html().should.include 'jump-to-top'
        @router.jump.$el.css.args[0][0].right.should.equal 'inherit'

    describe 'events', ->

      beforeEach ->
        sinon.spy @AboutRouter.prototype, 'navigate'

      afterEach ->
        @router.navigate.restore()

      describe '#toTop', ->

        it 'triggers a event for /about', ->
          @router.$jumpContainer.click()
          @router.navigate.args[0][0].should.equal '/about'

      describe '#toSection', ->

        it 'triggers an event for the slug of the link', ->
          $('#about-page-nav a').first().click()
          @router.navigate.args[0][0].should.equal '/about/jobs'

    describe '#positionFromSlug', ->
      it 'should return the distance from the top, minus the header height, of a given section heading'
