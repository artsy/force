_ = require 'underscore'
Articles = require '../../collections/articles'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
{ Cities } = require 'places'
{ API_URL, POSITRON_URL, FUSION_URL } = require('sharify').data
artsyXapp = require 'artsy-xapp'
PAGE_SIZE = 100
FUSION_PAGE_SIZE = 1000

epoch = -> moment('2010,9,1')
buckets = _.times moment().diff(epoch(), 'months'), (i) ->
  {
    start: epoch().add(i, 'months').format('YYYY-MM-DD')
    end: epoch().add(i + 1, 'months').format('YYYY-MM-DD')
  }

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      # id for "Artsy Editorial" (exclude partner posts)
      author_id: "503f86e462d56000020002cc"
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(2, 'days'))
      res.set('Content-Type', 'text/xml')
      res.render('news_sitemap', { pretty: true, articles: recentArticles })

@imagesIndex = (req, res, next) ->
    request
      .head(API_URL + '/api/v1/artworks')
      .set('X-XAPP-TOKEN': artsyXapp.token)
      .query(total_count: 1)
      .end (err, results) ->
        return next err if err
        artworkPages = Math.ceil results.headers['x-total-count'] / PAGE_SIZE
        res.set('Content-Type', 'text/xml')
        res.render('images_index', { pretty: true, artworkPages: artworkPages })

@index = (req, res, next) ->
  resources = ['artists']
  async.parallel [
    # Get artworks between 3 month date ranges
    (cb) ->
      async.map buckets, (bucket, cb) ->
        request
          .get("#{FUSION_URL}/api/v1/artworks")
          .query(
            published_at_since: bucket.start
            published_at_before: bucket.end
            limit: 1
          )
          .end (err, sres) ->
            return cb(err) if err
            pages = Math.ceil sres.body.count / FUSION_PAGE_SIZE
            cb null, { timestamp: bucket.start, pages: pages }
      , (err, results) ->
        cb err, results
    # Get articles counts
    (cb) ->
      request
        .get(POSITRON_URL + '/api/articles')
        .query(published: true, limit: 1)
        .end (err, sres) ->
          return cb(err) if err
          totalCount = Math.ceil sres.body.count / PAGE_SIZE
          cb null, totalCount
    # Get the rest of the resource counts
    (cb) ->
      async.map resources, ((resource, cb) ->
        request
          .head(API_URL + '/api/v1/' + resource)
          .set('X-XAPP-TOKEN': artsyXapp.token)
          .query(total_count: 1)
          .end(cb)
      ), (err, results) ->
        return cb(err) if err
        allPages = results.map (sres) -> Math.ceil sres.headers['x-total-count'] / PAGE_SIZE
        cb null, allPages
  ], (err, [artworkBuckets, articlePages, allPages]) ->
    return next(err) if err
    res.set('Content-Type', 'text/xml')
    res.render('index', {
      pretty: true
      artworkBuckets: artworkBuckets
      articlePages: articlePages
      allPages: allPages
      resources: resources
    })

@misc = (req, res, next) ->
  res.set('Content-Type', 'text/xml')
  res.render('misc', pretty: true)

@cities = (req, res, next) ->
  res.set('Content-Type', 'text/xml')
  res.render('cities', pretty: true, citySlugs: _.pluck(Cities, 'slug'))

@artworksPage = (req, res, next) ->
  request
    .get("#{FUSION_URL}/api/v1/artworks")
    .query(
      published_at_since: req.params.date
      published_at_before: moment(req.params.date).add(1, 'months').format('YYYY-MM-DD')
      offset: (req.params.page - 1) * FUSION_PAGE_SIZE
      limit: FUSION_PAGE_SIZE
      'fields[]': ['id']
    )
    .end (err, sres) ->
      return next err if err
      res.set('Content-Type', 'text/xml')
      res.render('artworks', pretty: true, models: sres.body.results)

@articlesPage = (req, res, next) ->
  request
    .get(POSITRON_URL + '/api/articles')
    .query(offset: req.params.page * PAGE_SIZE, limit: PAGE_SIZE, published: true)
    .end (err, sres) ->
      return next err if err
      slugs = _.pluck(sres.body.results, 'slug')
      res.set('Content-Type', 'text/xml')
      res.render('articles', pretty: true, slugs: slugs)

@resourcePage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/' + req.params.resource)
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page, size: PAGE_SIZE)
    .end (err, sres) ->
      return next err if err
      res.set('Content-Type', 'text/xml')
      res.render(req.params.resource, pretty: true, models: sres.body)

@imagesPage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/artworks')
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page, size: PAGE_SIZE)
    .end (err, sres) ->
      return next err if err
      res.set('Content-Type', 'text/xml')
      res.render('images_page', pretty: true, artworks: sres.body)
