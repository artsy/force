bootstrap = require '../../components/layout/bootstrap'
sd = require('sharify').data
{ Profile } = require '../../models/profile'
{ Articles } = require '../../collections/articles'
artworkListTemplate = -> require('../../components/artwork_list/template.jade') arguments...
articleFigureTemplate = -> require('../../components/article_figure/template.jade') arguments...

$ ->
  bootstrap()
  profile = new Profile sd.PROFILE
  owner = sd.PROFILE && sd.PROFILE.owner && sd.PROFILE.owner.id
  new Articles().fetch
    data: all_by_author: owner, published: true
    success: (articles) ->
      $('#profile-page-articles').html articles.map((article) ->
        articleFigureTemplate article: article
      ).join ''
