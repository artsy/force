import { data as sd } from "sharify"
import { map } from "lodash"
const Artist = require("desktop/models/artist.coffee")
const CurrentUser = require("desktop/models/current_user.coffee")
const {
  Following,
  FollowButton,
} = require("desktop/components/follow_button/index.coffee")

// TODO: Deprecate in favor of relay follow, needs added to Reaction article Text
// https://artsyproduct.atlassian.net/browse/GROW-725

export const setupFollows = () => {
  if (CurrentUser.orNull()) {
    return new Following(null, { kind: "artist" })
  }
}

export const setupFollowButtons = following => {
  // @ts-ignore
  const artists = map($(".artist-follow"), artist => {
    return artist.getAttribute("data-id")
  })
  map(artists, artist => {
    // @ts-ignore
    const _followButton = new FollowButton({
      // @ts-ignore
      el: $(`.artist-follow[data-id="${artist}"]`),
      following,
      modelName: "artist",
      model: new Artist({ id: artist }),
      context_page: "Article Page",
      context_module: "article_artist_follow",
      href: sd.APP_URL + sd.CURRENT_PATH,
    })
  })
  if (CurrentUser.orNull()) {
    following.syncFollows(artists)
  }
}
