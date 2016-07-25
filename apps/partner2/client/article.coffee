ArticleView = require '../../../components/article/client/view.coffee'
Article = require '../../../models/article.coffee'
sd = require('sharify').data

module.exports = class ArticleAdapter
  constructor: ({ profile, partner, cache, el }) ->
    console.log 'here.'
    console.log profile
    console.log partner

    article = new Article
    el.html '<div class="loading-spinner"></div>'
    # view = new ArticleView el: el, article: article
    # view
