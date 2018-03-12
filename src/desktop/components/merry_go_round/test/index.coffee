_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
sinon = require 'sinon'
existy = _.negate _.isUndefined
initCarousel = rewire '../index'
bottomNavTemplate = require('jade').compileFile(require.resolve '../templates/bottom_navigation.jade')
horizontalNavTemplate = require('jade').compileFile(require.resolve '../templates/horizontal_navigation.jade')

xdescribe 'MerryGoRound', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      $.fn.imagesLoaded = (cb) -> cb()
      Backbone.$ = $

      flickity = ->
        on: (->)
        selectedIndex: 0
        cells: [
          { target: {} }
          { target: {} }
          { target: {} }
          { target: {} }
          { target: {} }]
        next: (->)
        previous: (->)
        select: (->)
        selectedCell: target: {}
        getLastCell: -> target: {}
        options: {}

      stub = class MerryGoRoundFlickity
        constructor: -> @flickity = flickity()

      initCarousel.__set__ 'MerryGoRoundFlickity', stub

      $('body').html "
        <div class='js-carousel'>
          <div class='js-mgr-cells'>
            <div class='js-mgr-cell'></div>
            <div class='js-mgr-cell'></div>
            <div class='js-mgr-cell'></div>
          </div>
          <nav class='js-mgr-navigation'></nav>
        </div>
      "
      done()

  after ->
    benv.teardown()

  describe '#initCarousel', ->
    it 'sets up the carousel', ->
      instance = initCarousel $('.js-carousel'), template: bottomNavTemplate
      existy(instance.cells).should.be.true()
      existy(instance.navigation).should.be.true()

    it 'pre-renders the navigation', ->
      instance = initCarousel $('.js-carousel'), template: bottomNavTemplate
      html = instance.navigation.$el.html()
      html.should.containEql 'mgr-arrow-left'
      html.should.containEql 'mgr-dots'
      html.should.containEql 'mgr-arrow-right'

    it 'accepts a template', ->
      instance = initCarousel $('.js-carousel'), template: horizontalNavTemplate
      html = instance.navigation.$el.html()
      html.should.containEql 'mgr-arrow-left'
      html.should.not.containEql 'mgr-dots'
      html.should.containEql 'mgr-arrow-right'

    it 'accepts a callback', ->
      initCarousel $('.js-carousel'), template: bottomNavTemplate, (instance) ->
        existy(instance.cells).should.be.true()
        existy(instance.navigation).should.be.true()

    it 'returns without an error if there is no $el', ->
      initCarousel $('.sorry')
      _.isUndefined initCarousel()
        .should.be.true()

  describe 'view', ->
    beforeEach ->
      { @navigation, cells } = initCarousel $('.js-carousel'), template: bottomNavTemplate
      { @flickity } = cells

    it 'isStart', ->
      @navigation.isStart().should.be.true()
      @flickity.selectedIndex = 1
      @navigation.isStart().should.be.false()

    it 'isEnd', ->
      @navigation.isEnd().should.be.false()

      @flickity.selectedIndex = 4
      @navigation.isEnd().should.be.true()

      @navigation.advanceBy = 3
      @flickity.selectedIndex = 1
      @navigation.isEnd().should.be.false()

      @navigation.advanceBy = 3
      @flickity.selectedIndex = 2
      @navigation.isEnd().should.be.true()

    describe 'next', ->
      beforeEach ->
        sinon.stub @flickity, 'select'
        sinon.stub @flickity, 'next'

      afterEach ->
        @flickity.select.restore()
        @flickity.next.restore()

      it 'advances by specified amount', ->
        @navigation.advanceBy = 2
        @navigation.next(preventDefault: ->)
        @flickity.select.args[0][0].should.eql 2

      it 'otherwise advances by one', ->
        @navigation.next(preventDefault: ->)
        @flickity.next.called.should.be.true()

      it 'does nothing if last cell and not wrapAround', ->
        @flickity.selectedIndex = 4
        @navigation.next(preventDefault: ->)
        @flickity.select.called.should.be.false()
        @flickity.next.called.should.be.false()

      it 'advances past the end if wrapAround is true', ->
        @flickity.options.wrapAround = true

        @flickity.selectedIndex = 4
        @navigation.next(preventDefault: ->)
        @flickity.next.called.should.be.true()

        @flickity.selectedIndex = 4
        @navigation.advanceBy = 2
        @navigation.next(preventDefault: ->)
        @flickity.select.args[0][0].should.eql 6

  describe 'option `imagesLoaded` is `true`', ->
    it 'returns a thennable', ->
      initCarousel $('.js-carousel'), imagesLoaded: true, template: bottomNavTemplate
        .then (instance) ->
          existy(instance.cells).should.be.true()
          existy(instance.navigation).should.be.true()
