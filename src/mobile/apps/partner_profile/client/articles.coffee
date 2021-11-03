sd = require('sharify').data
bootstrap = require '../../../components/layout/bootstrap'
{ Articles } = require '../../../collections/articles'
articleFigureTemplate = -> require('../../../components/article_figure/template.jade') arguments...

$ ->
  bootstrap()
  owner = sd.PROFILE && sd.PROFILE.owner && sd.PROFILE.owner._id
  new Articles().fetch
    data: partner_id: owner, published: true
    success: (articles) ->
      $('#profile-page-articles').html articles.map((article) ->
        articleFigureTemplate article: article
      ).join ''
