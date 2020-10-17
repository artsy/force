{ Following, FollowButton } = require '../../../../components/follow_button/index'
Artist = require '../../../../models/artist.coffee'
Gene = require '../../../../models/gene.coffee'
{ ContextModule, OwnerType } = require "@artsy/cohesion"
template = -> require('./template.jade') arguments...

followableObject =
  followed_artist: (module) ->
    module.context.artist
  related_artists: (module) ->
    module.context.artist
  genes: (module) ->
    module.context
  generic_gene: (module) ->
    module.context

getContextModule = (key) ->
  switch key
    when 'genes' then ContextModule.categoryRail
    when 'generic_gene' then ContextModule.categoryRail
    when 'popular_artists' then ContextModule.worksByPopularArtistsRail
    when 'live_auctions' then ContextModule.liveAuctionsRail
    when 'followed_artist' then ContextModule.newWorksByArtistsYouFollowRail
    when 'related_artists' then ContextModule.relatedArtistsRail

module.exports = ({ module, user, $el }) ->
  return unless followableObject[module.key]?

  artistRelated = module.key is 'related_artists' or module.key is 'followed_artist'

  kind = if artistRelated then 'artist' else 'gene'
  Model = if artistRelated then Artist else Gene
  followable = followableObject[module.key](module)

  model = new Model followable
  if user.isLoggedIn()
    following = new Following null, kind: kind

  $el.append template()

  new FollowButton
    el: $el.find('.plus-follow-button')
    following: following
    model: model
    modelName: kind
    context_module: getContextModule(module.key)
    context_page: OwnerType.home

  following?.syncFollows [followable.id]

