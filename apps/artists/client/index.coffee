{ CURRENT_USER } = require('sharify').data
Artist = require '../../../models/artist.coffee'
{ Following, FollowButton } = require '../../../components/follow_button/index.coffee'
CarouselView = require './carousel.coffee'

module.exports.init = ->
  if CURRENT_USER?
    following = new Following(null, kind: 'artist')

  setupFollowButtons = ($buttons, message, collection) ->
    $buttons.map(->
      id = ($el = $(this)).data 'id'
      new FollowButton
        context_page: "Artists page"
        following: collection
        notes: message
        model: new Artist id: id
        modelName: 'artist'
        el: $el
      id
    ).get()

  featuredArtistFollowIds =
    setupFollowButtons $('.artists-featured-carousel .follow-button'), 'Followed from /artists featured', following
  trendingArtistFollowIds =
    setupFollowButtons $('.artists-featured-genes .follow-button'), 'Followed from /artists trending', following

  if CURRENT_USER?
    following.syncFollows featuredArtistFollowIds.concat(trendingArtistFollowIds)

  new CarouselView el: $('.artists-featured-carousel')
