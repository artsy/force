export const canvasBody = `
  slug
  thumbnail_title
  thumbnail_image
  published_at
  contributing_authors {
    name
  }
  authors {
    name
  }
`

export const relatedArticles = `
  relatedArticlesPanel {
    slug
    thumbnail_title
    thumbnail_image
  }
  relatedArticlesCanvas {
    ${canvasBody}
  }
  relatedArticles {
    description
    thumbnail_title
    thumbnail_image
    title
    slug
    media {
      duration
      published
      release_date
    }
  }
`

export const relatedArticlesNews = (offset, limit) => {
  return `
    articles(published: true, limit: 4, offset: ${offset}, sort: "-published_at"){
      ${canvasBody}
    }
  `
}
