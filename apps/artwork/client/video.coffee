_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ parse } = require 'url'
qs = require 'querystring'

module.exports = class VideoView extends Backbone.View

  initialize: (options) ->
    { @artwork } = options
    @render()

  render: ->
    @$video = $ """
      <div class='artwork-video'>
        <iframe></iframe>
        <div class='play-button'></div>
      </div>
    """
    @$('.artwork-image').append @$video

  events:
    'click .artwork-video': 'play'
    'click .artwork-additional-images > a': 'toggleVideo'

  play: ->
    q = qs.parse parse(@artwork.get 'website').query
    height = q.height or @$('.artwork-image img').height()
    width = q.width or @$('.artwork-image img').width()

    @$video.addClass('is-loaded').find('iframe').replaceWith switch parse(@artwork.get 'website').host
      when 'youtu.be'
        id = _.last @artwork.get('website').split('/')
        """
          <iframe src="//www.youtube.com/embed/#{id}?autoplay=1"
                  height="#{height}" width="#{width}"
                  allowfullscreen>
          </iframe>
        """
      when 'vimeo.com'
        id = _.last @artwork.get('website').split('/')
        """
          <iframe src="//player.vimeo.com/video/#{id}?color=ffffff&autoplay=1"
                  height="#{height}" width="#{width}"
                  allowfullscreen>
          </iframe>
        """

  toggleVideo: (e) ->
    if $(e.currentTarget).is(':first-child')
      @$video.show()
    else
      @$video.find('iframe').replaceWith '<iframe></iframe>'
      @$video.hide()