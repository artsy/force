export default `
  id
  title
  search_title
  social_title
  description
  search_description
  social_description
  thumbnail_image
  thumbnail_title
  social_image
  published_at
  tags
  tracking_tags
  slug
  layout
  featured
  channel_id
  partner_channel_id
  indexable
  keywords
  published
  postscript
  is_super_article
  is_super_sub_article
  series_description
  sponsor {
    partner_dark_logo
    partner_light_logo
    partner_condensed_logo
    partner_logo_link
  }
  seriesArticle {
    series_description
    title
    slug
    sponsor {
      partner_dark_logo
      partner_light_logo
      partner_condensed_logo
      partner_logo_link
    }
  }
  super_article {
    partner_link
    partner_link_title
    partner_logo
    partner_logo_link
    partner_fullscreen_header_logo
    secondary_partner_logo
    secondary_logo_text
    secondary_logo_link
    footer_blurb
    footer_title
    related_articles
  }
  email_metadata {
    headline
    author
    image_url
  }
  authors {
    image_url
    twitter_handle
    name
    id
    bio
  }
  contributing_authors {
    name
  }
  vertical {
    name
    id
  }
  media {
    url
    credits
    description
    cover_image_url
    published
    duration
    release_date
  }
  hero_section {
    ...Image
    ...Video
    ... on FeatureHeader {
      type
      title
      url
    }
    ... on SeriesHeader {
      url
    }
  }
  sections {
    ... on Text {
      type
      body
    }
    ... on Embed {
      type
      url
      height
      mobile_height
      layout
    }
    ...Video
    ... on Callout {
      type
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
`
