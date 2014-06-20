_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class Slideshow extends Backbone.View

  initialize: (options) ->
    { @artworks } = options
    @artworks.on 'sync', @render
    $('body').on 'keyup', @onKeyup
    @next()

  resetInterval: ->
    clearInterval @interval
    @interval = setInterval (=> @next()), 7000

  onKeyup: (e) =>
    switch e.which
      when 39 then @next() # Right arrow
      when 37 then @next -1 # Left arrow
      when 27 then @toggle() if @$('#user-profile-collection-slideshow').is(':visible') # ESC

  render: =>
    @$("#upc-slideshow-artworks").html @artworks.map((artwork) ->
      """
        <figure style='background-image: url("#{artwork.defaultImageUrl 'larger'}")'>
          <figcaption>
            #{artwork.get('artist').name}
            <em>#{artwork.get 'title'}</em>, #{artwork.get 'date'}
          </figcaption>
        </figure>
      """
    )
    @$('#upc-slideshow-left, #upc-slideshow-right').remove() if @artworks.length is 1

  next: (dir = 1) ->
    index = @$('#upc-slideshow-artworks figure.is-active').index() + dir
    index = 0 if index is @$('#upc-slideshow-artworks figure').length
    @$('#upc-slideshow-artworks figure').removeClass('is-active')
    @$("#upc-slideshow-artworks figure:eq(#{index})").addClass('is-active')
    @resetInterval()

  events:
    'click #user-profile-collection-right-slideshow, #upc-slideshow-close': 'toggle'
    'click #upc-slideshow-right': -> @next 1
    'click #upc-slideshow-left': -> @next -1

  toggle: ->
    @$('#user-profile-collection-slideshow').fadeToggle('fast')
    @$('#upc-slideshow-artworks figure').removeClass('is-active')
    @$('#upc-slideshow-artworks figure:first-child').addClass('is-active')
    @resetInterval()