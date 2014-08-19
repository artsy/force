_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
{ parse } = require 'url'
qs = require 'querystring'

module.exports = class VideoView extends Backbone.View

  initialize: (options) ->
    { @artwork } = options
    return unless @artwork.get('website')?.match('vimeo|youtu') and
                  @artwork.get('category').match('Video')
    @render()

  render: ->
    @$video = $ """
      <div class='artwork-video'>
        <div class='artwork-video-img' \
             style='background: url(#{@artwork.defaultImageUrl('large')})'>
          <div class='play-button'></div>
        </div>
      </div>
    """
    q = qs.parse parse(@artwork.get 'website').query
    @$video.css(width: q.width or 600, height: q.height or 400)
    @$('.artwork-image').replaceWith @$video

  events:
    'click .artwork-video': 'play'

  play: ->
    $('.artwork-video-img').remove()
    switch parse(@artwork.get 'website').host
      when 'youtu.be'
        id = _.last @artwork.get('website').split('/')
        @$video.append $iframe = """
          <iframe src="//www.youtube.com/embed/#{id}?autoplay=1"
                  allowfullscreen>
          </iframe>
        """
      when 'vimeo.com'
        id = _.last @artwork.get('website').split('/')
        @$video.append $iframe = """
          <iframe src="//player.vimeo.com/video/#{id}?color=ffffff&autoplay=1"
                  allowfullscreen>
          </iframe>
        """
