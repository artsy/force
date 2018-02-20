module.exports =
  """
  {
    articles(published: true, limit: 50, sort: "-published_at", featured: true ) {
      slug
      thumbnail_title
      thumbnail_image
      tier
      published_at
      channel_id
      author{
        name
      }
      contributing_authors{
        name
      }
    }
  }
  """
