export default function ArticleQuery (id) {
  return `
    {
      article(id: "${id}" ) {
        title
        description
        published_at
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
          ...on Video {
            caption
          }
          ...on Fullscreen {
            type
            title
            url
          }
        }
        sections {
          ... on Text {
            type
          }
          ... on Embed {
            type
          }
          ... on Video {
            type
          }
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
