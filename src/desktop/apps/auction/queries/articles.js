export default function ArticlesQuery(saleId) {
  return `
  query AuctionArticlesQuery {
    articles(published: true, auctionID: "${saleId}" ) {
      slug
      thumbnail_title: thumbnailTitle
      thumbnail_image: thumbnailImage{
        url
      }
      tier
      published_at: publishedAt
      channel_id: channelID
      author{
        name
      }
      contributing_authors: contributingAuthors{
        name
      }
    }
  }`
}
