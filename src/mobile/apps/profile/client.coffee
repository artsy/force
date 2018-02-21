bootstrap = require '../../components/layout/bootstrap.coffee'
sd = require('sharify').data
Profile = require '../../models/profile.coffee'
Articles = require '../../collections/articles.coffee'
artworkListTemplate = -> require('../../components/artwork_list/template.jade') arguments...
articleFigureTemplate = -> require('../../components/article_figure/template.jade') arguments...

$ ->
  bootstrap()
  profile = new Profile sd.PROFILE
  new Articles().fetch
    data: all_by_author: sd.PROFILE.owner.id, published: true
    success: (articles) ->
      $('#profile-page-articles').html articles.map((article) ->
        articleFigureTemplate article: article
      ).join ''
