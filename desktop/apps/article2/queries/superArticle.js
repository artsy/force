const { stringifyJSONForWeb } = require('desktop/components/util/json.coffee')

export const SuperSubArticlesQuery = (ids) => {
  return `
    {
      articles(ids: ${stringifyJSONForWeb(ids)} ) {
        thumbnail_title
        thumbnail_image
        title
        slug
      }
    }
  `
}

export const SuperArticleQuery = (id) => {
  return `
    {
      articles(super_article_for: "${id}" ) {
        is_super_article
        thumbnail_title
        title
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
      }
    }
  `
}
