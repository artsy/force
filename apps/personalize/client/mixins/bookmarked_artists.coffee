Bookmarks = require '../../../../components/bookmarks/collection.coffee'

module.exports =
  initializeBookmarkedArtists: ->
    @bookmarks = new Bookmarks()
    @bookmarks.fetch
      success: (collection, response, options) =>
        # While although these artists *may* not actually be followed,
        # (if they have bookmarked them then unfollowed them)
        # this is pretty unlikely; so just display all artists "following"
        @followed.add @bookmarks.pluck('interest')
