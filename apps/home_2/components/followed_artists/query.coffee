module.exports = """
  fragment followed_artists_context on HomePageModuleContextFollowArists {
    counts {
      artists
    }
    artists {
      id
      name
    }
  }
"""