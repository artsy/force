module.exports = (limit = 50, offset = 0) ->
  """
  query EditorialArticlesQuery {
    articles(published: true, limit: #{limit}, sort: "-published_at", featured: true, offset: #{offset}) {
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
