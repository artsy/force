_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
Scroller = require '../../../components/scroller/index.coffee'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$tracks = @$('.about2-section3-genome-artwork-track')
    @$window.on 'keyup', @toggleGrid
    @$tracks.waypoint @onTrackWaypoint
    @setupHeroUnits()
    @setupTracks()
    @setupScroller()

  setupScroller: ->
    @scroller = new Scroller frequency: 100

    # Setup sticky nav
    (@$nav = @scroller.listen @$('.about2-section-nav'))
      .on('scroller:below', =>
        @$nav.addClass 'is-fixed'
      ).on 'scroller:above', =>
        @$nav.removeClass 'is-fixed'

    # Setup section navigation
    _.map @$('.about2-section'), (el) =>
      @scroller.listen($(el))
        .on('scroller:enter', (e) =>
          idx = $(e.currentTarget).addClass('is-active').data('idx')
          @$nav.find("a[data-idx=#{idx}]").addClass 'is-active'
        ).on 'scroller:leave', (e) =>
          idx = $(e.currentTarget).removeClass('is-active').data('idx')
          @$nav.find("a[data-idx=#{idx}]").removeClass 'is-active'

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

  setupTracks: ->
    @$tracks.imagesLoaded =>
      for el, i in @$tracks.toArray()
        next = @$tracks[i + 1]
        continue unless next
        bottom = $(next).offset().top + $(next).height()
        $(el).height bottom - $(el).offset().top

  onTrackWaypoint: (dir) ->
    tracks = $('.about2-section3-genome-artwork-track').toArray()
    for el, i in tracks
      if el is this
        index = i
        break
    if dir is 'down'
      $(this).addClass('is-fixed') unless this is _.last tracks
      $(tracks[i - 1])?.removeClass('is-fixed').addClass('is-docked')
    else if dir is 'up'
      $(this).removeClass('is-fixed is-docked')
      $(tracks[i - 1])?.addClass('is-fixed').removeClass('is-docked')

module.exports.init = ->
  new AboutView el: $ 'body'
