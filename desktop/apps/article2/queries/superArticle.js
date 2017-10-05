const { stringifyJSONForWeb } = require('desktop/components/util/json.coffee')

export default function SuperArticleQuery (ids, isSuperArticle) {
  if (isSuperArticle) {
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
  } else {
    return `
      {
        article(id: "${ids}" ) {
        }
      }
    `
  }
}
