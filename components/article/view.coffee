_ = require 'underscore'
sd = require('sharify').data
Backbone = require 'backbone'
imagesLoaded = require 'imagesloaded'
embedVideo = require 'embed-video'
CurrentUser = require '../../models/current_user.coffee'
Article = require '../../models/article.coffee'
Artwork = require '../../models/artwork.coffee'
Articles = require '../../collections/articles.coffee'
Artworks = require '../../collections/artworks.coffee'
ShareView = require '../share/view.coffee'
CTABarView = require '../cta_bar/view.coffee'
initCarousel = require '../merry_go_round/index.coffee'
Sticky = require '../sticky/index.coffee'
blurb = require '../gradient_blurb/index.coffee'
Q = require 'bluebird-q'
{ resize } = require '../resizer/index.coffee'
artworkItemTemplate = -> require(
  '../artwork_item/templates/artwork.jade') arguments...
editTemplate = -> require('./templates/edit.jade') arguments...
relatedTemplate = -> require('./templates/related.jade') arguments...
articleTemplate = -> require('./templates/index.jade') arguments...

module.exports = class ArticleView extends Backbone.View

  initialize: (options) ->
    @user = CurrentUser.orNull()
    { @article } = options
    new ShareView el: @$('.article-social')
    @sticky = new Sticky
    @renderSlideshow()
    @renderArtworks()
    @breakCaptions()
    @checkEditable()
    @sizeVideo()
    @setupStickyShare()
    @setupFooterArticles()

  renderSlideshow: =>
    initCarousel $('.js-article-carousel'), imagesLoaded: true

  renderArtworks: ->
    Q.all(for section in @article.get('sections') when section.type is 'artworks'
      Q.allSettled(
        for id in section.ids
          new Artwork(id: id).fetch
            success: (artwork) =>
              @$("[data-id=#{artwork.get '_id'}]").html(
                artworkItemTemplate artwork: artwork, artworkSize: ['larger', 'large']
              )
            error: (artwork) =>
              @$("[data-id=#{artwork.get 'id'}]").remove()
      ).spread (artworks...) =>
        artworks = _.pluck(_.reject(artworks, (artwork) -> artwork.state is 'rejected'), 'value')
        artworks = new Artworks artworks
        $el = @$("[data-layout=overflow_fillwidth]" +
          " li[data-id=#{artworks.first().get '_id'}]").parent()
        return unless $el.length
        @fillwidth $el
    )

  breakCaptions: ->
    @$('.article-section-image').each ->
      imagesLoaded $(this), =>
        $(this).width $(this).children('img').width()

  fillwidth: (el) ->
    return @$(el).parent().removeClass('is-loading') if $(window).width() < 700
    $list = @$(el)
    $list.fillwidthLite
      gutterSize: 30
      apply: (img) ->
        img.$el.closest('li').css(padding: '0 15px').width(img.width)
      done: ->
        # Make sure the captions line up in case rounding off skewed things
        tallest = _.max $list.find('.artwork-item-image-container').map(->
          $(this).height()).toArray()
        $list.find('.artwork-item-image-container').each -> $(this).height tallest
        # Remove loading state
        $list.parent().removeClass('is-loading')

  checkEditable: ->
    if (@user?.get('has_partner_access') and
       @user?.id is @article.get('author_id')) or
       @user?.isEditorialAdmin()
      editUrl = "#{sd.POSITRON_URL}/articles/" + @article.id + '/edit'
      message = if @article.get('published') then '' else "Draft"
      @renderedEditButton = true
      @$('#articles-body-container').append(
        editTemplate message: message, edit_url: editUrl
      )

  events:
    'click .articles-section-right-chevron, \
    .articles-section-left-chevron': 'toggleSectionCarousel'
    'click .article-video-play-button': 'playVideo'

  toggleSectionCarousel: (e) ->
    @$('.articles-section-show-header-right').toggleClass('is-over')

  playVideo: (e) ->
    $cover = $(e.currentTarget).parent()
    $iframe = $cover.next('.article-video').find('iframe')
    $newIframe = $iframe.clone().attr('src', $iframe.attr('src') + '&autoplay=1')
    $iframe.replaceWith $newIframe
    $cover.remove()

  sizeVideo: ->
    $videos = @$("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com']")

    calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) ->
      ratio = Math.min maxWidth / srcWidth, maxHeight / srcHeight
      { width: srcWidth*ratio, height: srcHeight*ratio }

    resizeVideo = ->
      newHeight = $(window).height() - 100

      $videos.each ->
        $el = $(this)
        $parent = $el.parent()
        c_width = $parent.outerWidth()
        c_height = $parent.outerHeight()
        maxHeight = if (newHeight < c_height) then newHeight else (c_width * .5625)
        { width, height } = calculateAspectRatioFit $el.width(), $el.height(), $parent.outerWidth(), maxHeight

        left = Math.max(0, ((c_width - width) / 2)) + "px"
        top = Math.max(0, ((c_height - height) / 2)) + "px"

        $el
          .height(height)
          .width(width)
          .css
            left: left
            top: top

    $(window).resize(_.debounce(resizeVideo, 100))
    resizeVideo()

  setupStickyShare: ->
    if sd.SCROLL_SHARE_ARTICLE isnt "static_current" and sd.SCROLL_SHARE_ARTICLE isnt "infinite_current"
      @sticky.add $(".article-container[data-path='#{sd.CURRENT_PATH}'] .article-share-fixed")

  setupFooterArticles: ->
    if sd.SCROLL_SHARE_ARTICLE.indexOf("static") < 0
      (related = new Articles).fetch
        data:
          tags: if @article.get('tags')?.length then @article.get('tags') else [null]
          sort: '-published_at'
          published: true
        success: =>
          safeRelated = _.union related.models, (new Articles sd.FOOTER_ARTICLES).models
          $('.article-related-widget').html relatedTemplate
            related: safeRelated.slice(0,3)
            resize: resize

  renderSelf: ($el) ->
    $el.append articleTemplate
      article: @article
      sd: sd
      resize: resize
    # blurb $(".article-container[data-id=#{@article.get('id')}]"), limit: 350