export default function ArticlesQuery(saleId) {
  return `{
    articles(published: true, auction_id: "${saleId}" ) {
      slug
      thumbnail_title
      thumbnail_image{
        url
      }
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
  }`
}
