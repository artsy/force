export const seriesRelatedArticlesBody = `
  authors {
    name
  }
  channel_id
  id
  description
  layout
  published_at
  published
  series {
    sub_title
  }
  slug
  social_description
  social_image
  social_title
  sponsor {
    partner_dark_logo
    partner_light_logo
    partner_condensed_logo
    partner_logo_link
    pixel_tracking_code
  }
  thumbnail_image
  thumbnail_title
  title
  media {
    duration
    published
    release_date
  }
  hero_section {
    ... on SeriesHeader {
      url
    }
  }
  relatedArticles {
    title
    layout
    slug
    hero_section {
      ... on FeatureHeader {
        url
        deck
      }
    }
    sections {
      ... on Text {
        type
        body
      }
      ... on ImageCollection {
        type
        layout
        images {
          ...Artwork
          ...Image
        }
      }
      ... on ImageSet {
        type
        title
        layout
        images {
          ...Image
          ...Artwork
        }
      }
    }
  }
`
