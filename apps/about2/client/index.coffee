_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
Scroller = require '../../../components/scroller/index.coffee'

class AboutView extends Backbone.View
  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid
    @setupHeroUnits()
    @setGenomeWorkHeights()
    @setupScroller()

  setupScroller: ->
    @scroller = new Scroller frequency: 100

    # Setup sticky nav
    @$nav = @scroller.listen @$('.about2-section-nav')
    @$fixedNav = @$nav.clone()
    @$nav.on('scroller:below', =>
      @$nav.css(visibility: 'hidden').after(@$fixedNav.addClass 'is-fixed')
    ).on 'scroller:above', =>
      @$fixedNav.remove()
      @$nav.attr style: null

    # Setup section navigation
    _.map @$('.about2-section'), (el) =>
      @scroller.listen($(el)).on('scroller:enter', (e) =>
        idx = $(e.currentTarget).addClass('is-active').data('idx')
        @$fixedNav.find("a[data-idx=#{idx}]").addClass 'is-active'
      ).on 'scroller:leave', (e) =>
        idx = $(e.currentTarget).removeClass('is-active').data('idx')
        @$fixedNav.find("a[data-idx=#{idx}]").removeClass 'is-active'

    # Setup transitions
    @listenTo @scroller, 'position', (top) ->
      # Todo

  setupHeroUnits: ->
    @$units = @$('.about2-hero-unit-bg')
    i = 0
    setInterval (=>
      $(@$units.removeClass('is-active').get i).addClass('is-active')
      i = (if (i + 1 < @$units.length) then i + 1 else 0)
    ), 5000

  toggleGrid: (e) =>
    @$('#about2-grid').toggle() if e.which is 71 # "g" key

  setGenomeWorkHeights: =>
    imagesLoaded '#about2-section3-genome-works', =>
      @$('.about2-section3-genome-artwork').each ->
        $(this).parent('li').height $(this).children('img').height()

module.exports.init = ->
  new AboutView el: $ 'body'
