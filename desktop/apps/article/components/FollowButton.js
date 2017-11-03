import Artist from 'desktop/models/artist.coffee'
import CurrentUser from 'desktop/models/current_user.coffee'
import { Following, FollowButton } from 'desktop/components/follow_button/index.coffee'
import { data as sd } from 'sharify'
import { map } from 'lodash'

export const setupFollows = () => {
  if (CurrentUser.orNull()) {
    return new Following(null, {kind: 'artist'})
  }
}

export const setupFollowButtons = (following) => {
  const artists = map($('.artist-follow'), artist => {
    return artist.getAttribute('data-id')
  })
  map(artists, artist => {
    new FollowButton({
      el: $(`.artist-follow[data-id="${artist}"]`),
      following,
      modelName: 'artist',
      model: new Artist({id: artist}),
      context_page: 'Article Page',
      context_module: 'article_artist_follow',
      href: sd.APP_URL + sd.CURRENT_PATH
    })
  })
  if (CurrentUser.orNull()) {
    following.syncFollows(artists)
  }
}
