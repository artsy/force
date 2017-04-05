UserInterests = require '../../../../collections/user_interests'

module.exports =
  initializeBookmarkedArtists: ->
    @bookmarks = new UserInterests
    @bookmarks.fetch
      success: (collection, response, options) =>
        # While although these artists *may* not actually be followed,
        # (if they have bookmarked them then unfollowed them)
        # this is pretty unlikely; so just display all artists "following"
        @followed.add @bookmarks.pluck('interest')
