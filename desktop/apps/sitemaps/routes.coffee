_ = require 'underscore'
Articles = require '../../collections/articles'
Artwork = require '../../models/artwork'
request = require 'superagent'
moment = require 'moment'
async = require 'async'
PartnerFeaturedCities = require '../../collections/partner_featured_cities'
{ NODE_ENV, API_URL, POSITRON_URL, FUSION_URL, APP_URL, ARTSY_EDITORIAL_CHANNEL } = require('sharify').data
artsyXapp = require 'artsy-xapp'
PAGE_SIZE = 100
FUSION_PAGE_SIZE = 5000

epoch = -> moment('2010 9 1', 'YYYY MM DD')
buckets = _.times moment().diff(epoch(), 'months'), (i) ->
  {
    start: epoch().add(i, 'months').format('YYYY-MM-DD')
    end: epoch().add(i + 1, 'months').format('YYYY-MM-DD')
  }

@articles = (req, res, next) ->
  new Articles().fetch
    data:
      # id for "Artsy Editorial" (exclude partner posts)
      channel_id: ARTSY_EDITORIAL_CHANNEL
      published: true
      sort: '-published_at'
      exclude_google_news: false
      limit: PAGE_SIZE
    error: res.backboneError
    success: (articles) ->
      recentArticles = articles.filter (article) ->
        moment(article.get 'published_at').isAfter(moment().subtract(2, 'days'))
      res.set 'Content-Type', 'text/xml'
      res.render('news_sitemap', { pretty: true, articles: recentArticles })

@imagesIndex = (req, res, next) ->
  getArtworkBuckets (err, artworkBuckets) ->
    return next err if err
    res.set 'Content-Type', 'text/xml'
    res.render('images_index', { pretty: true, artworkBuckets: artworkBuckets })

@index = (req, res, next) ->
  resources = ['artists', 'genes', 'partners', 'features', 'shows', 'fairs']
  async.parallel [
    # Get artworks between month date ranges
    getArtworkBuckets
    # Get articles counts
    (cb) ->
      request
        .get(POSITRON_URL + '/api/articles')
        .query(published: true, limit: 1, count: true)
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
    res.set 'Content-Type', 'text/xml'
    res.render('index', {
      pretty: true
      artworkBuckets: artworkBuckets
      articlePages: articlePages
      allPages: allPages
      resources: resources
    })

getArtworkBuckets = (callback) ->
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
        cb null, { startDate: bucket.start, pages: pages }
  , callback

@misc = (req, res, next) ->
  res.set 'Content-Type', 'text/xml'
  res.render('misc', pretty: true)

@cities = (req, res, next) ->
  partnerFeaturedCities = new PartnerFeaturedCities()
  partnerFeaturedCities.fetch
    success: ->
      res.set 'Content-Type', 'text/xml'
      res.render 'cities', pretty: true, citySlugs: partnerFeaturedCities.pluck('slug')

@artworksPage = (template) -> (req, res, next) ->
  request
    .get("#{FUSION_URL}/api/v1/artworks")
    .query(
      published_at_since: req.params.date
      published_at_before: moment(req.params.date).add(1, 'months').format('YYYY-MM-DD')
      offset: (req.params.page - 1) * FUSION_PAGE_SIZE
      limit: FUSION_PAGE_SIZE
      'fields[]': switch template
        when 'artworks' then ['id']
        when 'images' then [
          'id'
          'images.image_urls.large'
          'images.image_urls.larger'
          'images.is_default'
          'title'
          'artist.name'
          'date'
        ]
    )
    .end (err, sres) ->
      return next err if err
      res.set 'Content-Type', 'text/xml'
      models = _.map(sres.body.results, (artwork) -> new Artwork artwork)
      res.render(template, pretty: true, models: models)

@articlesPage = (req, res, next) ->
  request
    .get(POSITRON_URL + '/api/articles')
    .query(offset: req.params.page * PAGE_SIZE, limit: PAGE_SIZE, published: true)
    .end (err, sres) ->
      return next err if err
      slugs = _.pluck(sres.body.results, 'slug')
      res.set 'Content-Type', 'text/xml'
      res.render('articles', pretty: true, slugs: slugs)

@resourcePage = (req, res, next) ->
  request
    .get(API_URL + '/api/v1/' + req.params.resource)
    .set('X-XAPP-TOKEN': artsyXapp.token)
    .query(page: req.params.page, size: PAGE_SIZE)
    .end (err, sres) ->
      return next err if err
      res.set 'Content-Type', 'text/xml'
      res.render(req.params.resource, pretty: true, models: sres.body)

@bingjson = (req, res, next) ->
  res.set('Content-Disposition': 'attachment').write('[')
  getArtworkBuckets (err, buckets) ->
    async.mapSeries buckets.reverse(), (bucket, callback) ->
      iterator = (page, callback) ->
        request
          .get("#{FUSION_URL}/api/v1/artworks")
          .query(
            published_at_since: bucket.startDate
            published_at_before: moment(bucket.startDate).add(1, 'months').format('YYYY-MM-DD')
            offset: page * FUSION_PAGE_SIZE
            limit: FUSION_PAGE_SIZE
          )
          .end (err, sres) ->
            return next err if err
            return callback() if sres.body.results.length is 0
            streamResults sres.body.results, res
            callback()
      async.timesSeries(bucket.pages + 1, iterator, callback)
    , ->
      res.write('{}]')
      res.end()

@bingNew = (req, res, next) ->
  request
    .get("#{FUSION_URL}/api/v1/artworks")
    .query(published_at_since: moment().subtract(7, 'days').format('YYYY-MM-DD'))
    .end (err, sres) ->
      return next err if err
      res.set('Content-Disposition': 'attachment')
      res.send _.map(sres.body.results, resultToBingJSON)

streamResults = (results, res) ->
  results.forEach (result) ->
    res.write JSON.stringify(resultToBingJSON(result)) + ','

resultToBingJSON = (result) ->
  artwork = new Artwork result
  json = {
    "@context": {
      "bing": "http://www.bing.com/images/api/imagefeed/v1.0/"
    }
    "@type": "https://schema.org/ImageObject"
    "hostPageUrl": "#{APP_URL}/artwork/#{artwork.id}"
    "contentUrl": artwork.imageUrl()
    "name": artwork.get('title')
    "description": "
      #{if title = artwork.get('title') then "#{title}" else "This work"}
      #{if name = artwork.related().artist.get('name') then "was created by #{name}" else if maker = artwork.get('cultural_maker') then "was created by #{maker}" else ''}
      #{if date = artwork.get('date') then "in #{date}." else '. '}
      #{if institution = artwork.get('collecting_institution') != "" then "This work was exhibited at #{institution}." else "This work was exhibited at #{artwork.related().partner.get('name')}."}
    "
    "encodingFormat": "jpeg"
    "keywords": artwork.toPageDescription().split(', ')
    "datePublished": artwork.get('published_at')
    "dateModified": artwork.get('published_changed_at')
    "copyrightHolder": {
      "@type": "Organization"
      "name": artwork.related().artist.get('image_rights')
    }
  }
  if artwork.get('artist')
    json = _.extend json, {
      "author": {
        "alternateName": artwork.related().artist.get('name')
        "url": "#{APP_URL}/artist/#{artwork.related().artist.get('id')}"
      }
      "CollectionPage":[
        {
          "@type": "CollectionPage"
          "url": "#{APP_URL}/artist/#{artwork.related().artist.get('id')}"
        }
      ]
    }
  if img = artwork.defaultImage()
    dimensions = img.resizeDimensionsFor(width: 1024, height: 1024)
    json = _.extend json, {
      "height": dimensions.height
      "width": dimensions.width
    }
  json

@video = (req, res) ->
  new Articles().fetch
    data:
      featured: true
      published: true
      sort: '-published_at'
      has_video: true
      exclude_google_news: false
    error: res.backboneError
    success: (articles) ->
      res.set 'Content-Type', 'text/xml'
      res.render('video', { pretty: true, articles: articles, moment: moment })

@robots = (req, res) ->
  res.set 'Content-Type', 'text/plain'
  robotsText = """
    User-agent: *
    Noindex: ?sort=
    Noindex: ?dimension_range=
    Disallow: ?dns_source=
    Disallow: ?microsite=
    Disallow: ?from-show-guide=
    Sitemap: #{APP_URL}/sitemap.xml
    Sitemap: #{APP_URL}/images_sitemap.xml

  """
  res.send switch NODE_ENV
    when 'production'
      robotsText
    else
      "User-agent: *\nNoindex: /"
