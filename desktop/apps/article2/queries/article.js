export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}" ) {
        title
        description
        published_at
        slug
        layout
        contributing_authors {
          name
          id
        }
        vertical {
          name
          id
        }
        hero_section {
          ...Image
          ...Video
          ...on Fullscreen {
            type
            title
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
      }
    }

    fragment Image on Image {
      url
      caption
      type
      width
      height
    }

    fragment Video on Video {
      caption
      type
      url
      cover_image_url
      layout
      background_color
    }

    fragment Artwork on Artwork {
      type
      id
      slug
      image
      title
      date
      partner {
        name
        slug
      }
      artists {
        name
        slug
      }
      artist {
        name
        slug
      }
      width
      height
    }
  `
}
