Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
markdown = require '../../components/util/markdown.coffee'
httpProxy = require 'http-proxy'
Curation = require '../../models/curation.coffee'
Article = require '../../models/article.coffee'
Channel = require '../../models/channel.coffee'
Articles = require '../../collections/articles.coffee'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ ALLOWED_VANITY_ASSETS, VANITY_BUCKET, SAILTHRU_KEY, SAILTHRU_SECRET } = require '../../config.coffee'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)
proxy = httpProxy.createProxyServer(changeOrigin: true, ignorePath: true)
{ createMediaStyle } = require "../../../v2/Utils/Responsive"

mediaStyles = createMediaStyle()

@eoy = (req, res, next) ->
  @curation = new Curation(id: sd.EOY_2016)
  @article = new Article(id: sd.EOY_2016_ARTICLE)
  Promise.all([
    @curation.fetch(cache: true)
    @article.fetch(
      cache:  true
      headers: 'X-Access-Token': req.user?.get('accessToken') or ''
    )
  ]).then (result) =>
    @superSubArticles = new Articles

    Promise.all(@article.fetchSuperSubArticles(@superSubArticles, req.user?.get('accessToken')))
    .then =>
      res.locals.sd.SUPER_ARTICLE = @article.toJSON()
      res.locals.sd.CURATION = @curation.toJSON()
      @article.set 'channel', new Channel name: 'Artsy Editorial'
      res.locals.jsonLD = stringifyJSONForWeb(@article.toJSONLD())
      res.locals.sd.INCLUDE_SAILTHRU = true
      res.render 'components/eoy/templates/index',
        curation: @curation,
        article: @article,
        superSubArticles: @superSubArticles,
        markdown: markdown

@gucci = (req, res, next) ->
  slug = req.params.slug
  @curation = new Curation(id: sd.EF_GUCCI)
  @curation.fetch
    cache: true
    error: next
    success: (curation) =>
      videoIndex = setGucciVideoIndex(slug)
      res.locals.sd.CURATION = curation.toJSON()
      res.locals.sd.VIDEO_INDEX = videoIndex
      res.locals.sd.IS_NESTED_PATH = slug?
      res.locals.sd.INCLUDE_SAILTHRU = true
      res.locals.sd.RESPONSIVE_CSS = mediaStyles

      if res.locals.sd.IS_NESTED_PATH
        section = curation.get('sections')[videoIndex]
        appendTitle = ': ' + section.title
        thumbnailImage = section.thumbnail_image
        url = sd.APP_URL + '/gender-equality/' + slug
        dateCreated = section.release_date
      else
        appendTitle = ''
        thumbnailImage = curation.get('thumbnail_image')
        url = sd.APP_URL + '/gender-equality'
        dateCreated = curation.get('sections')[0].release_date
      jsonLD = {
        "@context": "http://schema.org"
        "@type": "NewsArticle"
        "headline": "Artists For Gender Equality" + appendTitle
        "url": url
        "thumbnailUrl": thumbnailImage
        "dateCreated": dateCreated
        "articleSection": 'Editorial'
        "creator": 'Artsy Editorial'
      }
      res.locals.jsonLD = stringifyJSONForWeb jsonLD
      res.render 'components/gucci/templates/index',
        curation: curation

@venice = (req, res, next) ->
  @curation = new Curation(id: sd.EF_VENICE)
  @veniceSubArticles = new Articles
  @videoGuide = new Article(id: sd.EF_VIDEO_GUIDE)
  @curation.fetch
    cache: true
    error: next
    success: (curation) =>
      promises = [
        if req.user then subscribedToEditorial(req.user.get('email')) else Promise.resolve()
        @videoGuide.fetch(
          cache: true
          headers: 'X-Access-Token': req.user?.get('accessToken') or ''
        )
      ]
      if @curation.get('sub_articles')?.length
        promises.push( @veniceSubArticles.fetch(data: 'ids[]': @curation.get('sub_articles'), cache: true) )
      Promise.all(promises)
      .then =>
        videoIndex = setVeniceVideoIndex(curation, req.params.slug)
        if isNaN videoIndex
          return res.redirect 301, '/venice-biennale/toward-venice'
        res.locals.sd.CURATION = curation.toJSON()
        res.locals.sd.VIDEO_GUIDE = @videoGuide.toJSON()
        res.locals.sd.VIDEO_INDEX = videoIndex
        res.locals.sd.INCLUDE_SAILTHRU = true
        section = curation.get('sections')[videoIndex]
        jsonLD = {
          "@context": "http://schema.org"
          "@type": "NewsArticle"
          "headline": "Inside the Biennale " + section.title
          "url": sd.APP_URL + '/venice-biennale/' + section.slug
          "thumbnailUrl": section.cover_image
          "dateCreated": section.release_date
          "articleSection": 'Editorial'
          "creator": 'Artsy Editorial'
        }
        res.locals.jsonLD = stringifyJSONForWeb jsonLD
        res.render 'components/venice_2017/templates/index',
          videoIndex: videoIndex
          curation: curation
          isSubscribed: @isSubscribed or false
          sub_articles: @veniceSubArticles?.toJSON()
          videoGuide: @videoGuide

@vanity = (req, res, next) ->
  allowedAssets = ALLOWED_VANITY_ASSETS
  return next() unless req.params[0].match allowedAssets
  req.headers['host'] = VANITY_BUCKET
  target = 'https://' + VANITY_BUCKET + '.s3.amazonaws.com' + '/' + req.params[0]
  proxy.web req, res, target: target, (err) ->
    res.redirect 301, '/articles' if err

setVeniceVideoIndex = (curation, slug) ->
  for section, i in curation.get 'sections'
    if section.slug is slug
      return i

setGucciVideoIndex = (slug) ->
  switch slug
    when 'past' then 0
    when 'present' then 1
    when 'future' then 2

subscribedToEditorial = (email) ->
  new Promise (resolve, reject) =>
    sailthru.apiGet 'user', { id: email }, (err, response) ->
      if response.vars?.receive_editorial_email
        @isSubscribed = true
      resolve()
