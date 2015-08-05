_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
{ Cities } = require 'places'
{ API_URL, POSITRON_URL } = require('sharify').data
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
      res.render('news_sitemap', { pretty: true, articles: recentArticles })

@index = (req, res, next) -> 
  resources = ['artists', 'genes', 'partners', 'features', 'shows', 'fairs']
  async.parallel [
    # Get artworks counts
    (cb) ->
      request
        .head(API_URL + '/api/v1/filter/artworks')
        .set('X-XAPP-TOKEN': artsyXapp.token)
        .query(total_count: 1)
        .end (err, sres) ->
          return cb(err) if err
          totalCount = Math.ceil sres.headers['x-total-count'] / 100
          cb null, totalCount
    # Get articles counts
    (cb) ->
      request
        .get(POSITRON_URL + '/api/articles')
        .query(published: true, limit: 1)
        .end (err, sres) ->
          return cb(err) if err
          totalCount = Math.ceil sres.body.count / 100
          cb null, totalCount
    # Get all of the rest of the resource counts
    (cb) ->
      async.map resources, ((resource, cb) ->
        request
          .head(API_URL + '/api/v1/' + resource)
          .set('X-XAPP-TOKEN': artsyXapp.token)
          .query(total_count: 1)
          .end(cb)
      ), (err, results) ->
        return cb(err) if err
        allPages = results.map (sres) -> Math.ceil sres.headers['x-total-count'] / 10
        cb null, allPages
  ], (err, [artworkPages, articlePages, allPages]) ->
    return next(err) if err
    res.set('Content-Type', 'text/xml')
    res.render('index', { 
      pretty: true 
      artworkPages: artworkPages
      articlePages: articlePages
      allPages: allPages 
      resources: resources
      citySlugs: _.pluck(Cities, 'slug')
    })  

@artworksPage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/filter/artworks')
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page, size: 100)
    .end (err, sres) ->
      slugs = _.pluck(sres.body.hits, 'id')
      res.set('Content-Type', 'text/xml')
      res.render('artworks', pretty: true, slugs: slugs)

@articlesPage = (req, res, next) ->
  request
    .get(POSITRON_URL + '/api/articles')
    .query(offset: req.params.page * 100, limit: 100, published: true)
    .end (err, sres) ->
      slugs = _.pluck(sres.body.results, 'slug')
      res.set('Content-Type', 'text/xml')
      res.render('articles', pretty: true, slugs: slugs)

@resourcePage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/' + req.params.resource)
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page)
    .end (err, sres) ->
      slugs = _.pluck(sres.body, 'id')
      res.set('Content-Type', 'text/xml')
      res.render(req.params.resource, pretty: true, slugs: slugs)