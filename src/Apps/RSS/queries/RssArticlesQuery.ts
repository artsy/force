import { graphql } from "react-relay"

export const RSS_ARTICLES_QUERY = graphql`
  query RssArticlesQuery($channelId: String!) {
    articlesConnection(
      channelId: $channelId
      sort: PUBLISHED_AT_DESC
      first: 50
    ) {
      edges {
        node {
          id
          publishedAt
          thumbnailTitle
          thumbnailImage {
            resized(width: 1100) {
              src
            }
          }
          href
          byline
          hero {
            ... on ArticleFeatureSection {
              embed
              image {
                resized(width: 1100) {
                  src
                }
              }
            }
          }
          sections {
            __typename
            ... on ArticleSectionText {
              body
            }
            ... on ArticleSectionEmbed {
              url
            }
            ... on ArticleSectionVideo {
              embed
            }
            ... on ArticleSectionImageCollection {
              figures {
                __typename
                ... on Artwork {
                  ...RssArticlesQuery_artwork @relay(mask: false)
                }
                ... on ArticleImageSection {
                  ...RssArticlesQuery_image @relay(mask: false)
                }
              }
            }
            ... on ArticleSectionImageSet {
              figures {
                __typename
                ... on Artwork {
                  ...RssArticlesQuery_artwork @relay(mask: false)
                }
                ... on ArticleImageSection {
                  ...RssArticlesQuery_image @relay(mask: false)
                }
              }
            }
          }
        }
      }
    }
  }
`

graphql`
  fragment RssArticlesQuery_artwork on Artwork {
    title
    date
    artists {
      name
    }
    partner {
      name
    }
    image {
      resized(width: 500, version: ["normalized", "larger", "large"]) {
        width
        height
        src
        srcSet
      }
    }
  }
`

graphql`
  fragment RssArticlesQuery_image on ArticleImageSection {
    image {
      caption
      resized(width: 500) {
        width
        height
        src
        srcSet
      }
    }
  }
`
