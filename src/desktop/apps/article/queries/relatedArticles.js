import { seriesRelatedArticlesBody } from "desktop/apps/article/queries/seriesRelatedArticles"

export const canvasBody = `
  id
  layout
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

export const panelBody = `
  id
  layout
  slug
  thumbnail_title
  thumbnail_image
`

export const relatedArticles = `
  relatedArticlesPanel {
    ${panelBody}
  }
  relatedArticlesCanvas {
    ${canvasBody}
  }
  relatedArticles {
    ${seriesRelatedArticlesBody}
  }
`

export const relatedArticlesNews = (offset, limit) => {
  return `
    articles(published: true, in_editorial_feed: true, limit: 4, offset: ${offset}, sort: "-published_at"){
      ${canvasBody}
    }
  `
}
