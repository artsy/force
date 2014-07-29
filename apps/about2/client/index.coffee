_ = require 'underscore'
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'

class AboutView extends Backbone.View

  initialize: ->
    @$window = $(window)
    @$window.on 'keyup', @toggleGrid
    @setupHeroUnits()
    @setupTracks()
    @setupStickyNav()
    @setupSectionNavHighlighting()

  setupStickyNav: ->
    (@$nav = @$('.about2-section-nav'))
      .waypoint 'sticky'

  setupSectionNavHighlighting: ->
    $nav = @$nav
    activateNavLink = (self) ->
      idx = $(self).addClass('is-active').data 'idx'
      $nav.find('a').removeClass 'is-active'
      $nav.find("a[data-idx=#{idx}]").addClass 'is-active'
    (@$sections = @$('.about2-section'))
      .waypoint((direction) ->
        activateNavLink(this) if direction is 'down'
      ).waypoint (direction) ->
        activateNavLink(this) if direction is 'up'
      , offset: -> -$(this).height() + 100

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
    (@$tracks = @$('.about2-section3-genome-artwork-track'))
      .waypoint(@onTrackWaypoint)
      .imagesLoaded =>
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
