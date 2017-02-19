{ Following, FollowButton } = require '../../../../components/follow_button/index.coffee'
Artist = require '../../../../models/artist.coffee'
Gene = require '../../../../models/gene.coffee'
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

module.exports = ({ module, user, $el }) ->
  return unless followableObject[module.key]?

  kind = if module.key is 'related_artists' or 'followed_artist' then 'artist' else 'gene'
  Model = if module.key is 'related_artists' or 'followed_artist' then Artist else Gene
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
    context_module: "Homepage rail"

  following?.syncFollows [followable.id]

