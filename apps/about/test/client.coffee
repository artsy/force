benv            = require 'benv'
rewire          = require 'rewire'
Backbone        = require 'backbone'
sinon           = require 'sinon'
Page            = require '../../../models/page.coffee'
mediator        = require '../../../lib/mediator.coffee'
{ fabricate }   = require 'antigravity'

describe 'Client-side code for About page', ->
  before (done) ->
    benv.setup =>
      benv.expose { $: require 'components-jquery' }
      Backbone.$ = $
      done()

  beforeEach (done) ->
    page = new Page fabricate 'page'
    benv.render '../template.jade', {
      sd: {},
      page: page,
      nav: page
    }, =>
      { AboutRouter, AboutView } = require '../client'
      @router   = new AboutRouter
      @view     = @router.view
      # The fabricated page doesnt have nav content; insert an example
      @view.$('#about-page-nav').prepend('<a href="/about/jobs"></a>')
      done()

  describe 'AboutView', ->
    describe '#initialize', ->
      it 'should render a jump navigation and set its right CSS prop to inherit', ->
        @view.$jumpContainer.html().should.include 'jump-to-top'
        @view.$jumpContainer.html().should.include 'right: inherit'

    describe 'events', ->
      beforeEach ->
        @triggerSpy = sinon.spy mediator, 'trigger'

      afterEach ->
        mediator.trigger.restore()

      describe '#toTop', ->
        it 'triggers a event for /about', ->
          @view.$jumpContainer.click()
          @triggerSpy.args[0][1].should.equal 'about'

      describe '#toSection', ->
        it 'triggers an event for the slug of the link', ->
          @view.$('#about-page-nav a').first().click()
          @triggerSpy.args[0][1].should.equal '/about/jobs'

    describe '#positionFromSlug', ->
      it 'should return the distance from the top, minus the header height, of a given section heading'

  describe 'AboutRouter', ->
    it '#triggerSection', ->
      navigateSpy = sinon.spy @router, 'navigate'
      @router.triggerSection '/about/jobs'
      navigateSpy.args[0][0].should.equal '/about/jobs'
      navigateSpy.restore()
