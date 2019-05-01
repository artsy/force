_ = require 'underscore'
React = require 'react'
ReactDOM = require 'react-dom'
{ NewsPanel } = require '@artsy/reaction/dist/Components/Publishing/News/NewsPanel'
{ AuthWrapper } = require("desktop/apps/articles/components/AuthWrapper")
Articles = require '../../../collections/articles.coffee'
ArticlesFeedView = require '../../../components/articles_feed/view.coffee'
sd = require('sharify').data


module.exports.init = ->
  articles = new Articles sd.ARTICLES
  articles.reset articles.feed()
  feedView = new ArticlesFeedView
    el: $('.articles-articles-feed')
    collection: articles
    fetchWith:
      limit: 50
      published: true
      featured: true
      sort: '-published_at'
  feedView.render()

  ReactDOM.render(
    React.createElement(
      NewsPanel,
      {articles: sd.NEWS_ARTICLES}
    ),
    document.getElementById('news-panel')
  )

  ReactDOM.render(
    React.createElement(
      AuthWrapper, {}
    ),
    document.getElementById('signup-modal')
  )
