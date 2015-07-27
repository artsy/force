_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
{ API_URL } = require('sharify').data
artsyXapp = require 'artsy-xapp'

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: 100
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(5, 'days'))
      res.set('Content-Type', 'text/xml')
      res.render('articles', { pretty: true, articles: recentArticles })

@index = (req, res, next) -> 
  resources = ['artists', 'genes'] # add 
  # artworks when that's fixed in gravity, artist/artwork auction 
  # results, browse_filter_sites, fair_sites, partner_profile_sites, misc
  async.map resources, ((resource, cb) ->
    request
      .head(API_URL + '/api/v1/' + resource)
      .set('X-XAPP-TOKEN': artsyXapp.token)
      .query(total_count: 1)
      .end(cb)
  ), (err, results) ->
    return next(err) if err
    allPages = results.map (sres) -> Math.ceil sres.headers['x-total-count'] / 10
    console.log(allPages)
    res.set('Content-Type', 'text/xml')
    res.render('index', { pretty: true, allPages: allPages, resources: resources })  

@resourcePage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/' + req.params.resource)
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page)
    .end (err, sres) ->
      slugs = _.pluck(sres.body, 'id')
      console.log(slugs, sres.body)
      res.set('Content-Type', 'text/xml')
      res.render('resource_page', pretty: true, slugs: slugs, pageRoot: 
        req.params.resource.replace(/s$/, '') )