import { graphql } from "relay-runtime"

export const RSS_PARTNER_UPDATES_QUERY = graphql`
  query RssPartnerUpdatesQuery($channelId: String!) {
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
                  ...RssPartnerUpdatesQuery_artwork @relay(mask: false)
                }
                ... on ArticleImageSection {
                  ...RssPartnerUpdatesQuery_image @relay(mask: false)
                }
              }
            }
            ... on ArticleSectionImageSet {
              figures {
                __typename
                ... on Artwork {
                  ...RssPartnerUpdatesQuery_artwork @relay(mask: false)
                }
                ... on ArticleImageSection {
                  ...RssPartnerUpdatesQuery_image @relay(mask: false)
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
  fragment RssPartnerUpdatesQuery_artwork on Artwork {
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
  fragment RssPartnerUpdatesQuery_image on ArticleImageSection {
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
