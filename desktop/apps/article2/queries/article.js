export default function ArticleQuery (id) {
  return `{
    articles(published: true, id: "${id}" ) {
      sections {
        ... on ImageCollection {
          type
          images {
            ... on Image {
              url
              caption
              type
            }
            ... on Artwork {
              type
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
            }
          }
        }
        ... on ImageSet {
          type
          images {
            ... on Image {
              url
              caption
              type
            }
            ... on Artwork {
              type
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
            }
          }
        }
      }
    }
  }`
}
