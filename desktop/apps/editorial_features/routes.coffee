Backbone = require 'backbone'
_ = require 'underscore'
sd = require('sharify').data
Q = require 'bluebird-q'
markdown = require '../../components/util/markdown.coffee'
httpProxy = require 'http-proxy'
Curation = require '../../models/curation.coffee'
Article = require '../../models/article.coffee'
Channel = require '../../models/channel.coffee'
Articles = require '../../collections/articles.coffee'
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ WHITELISTED_VANITY_ASSETS, VANITY_BUCKET } = require '../../config.coffee'

@eoy = (req, res, next) ->
  @curation = new Curation(id: sd.EOY_2016)
  @article = new Article(id: sd.EOY_2016_ARTICLE)
  Q.all([
    @curation.fetch(cache: true)
    @article.fetch(
      cache:  true
      headers: 'X-Access-Token': req.user?.get('accessToken') or ''
    )
  ]).then (result) =>
    @superSubArticles = new Articles

    Q.all(@article.fetchSuperSubArticles(@superSubArticles, req.user?.get('accessToken')))
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

@venice = (req, res, next) ->
  @curation = new Curation(id: sd.EF_VENICE)
  @veniceSubArticles = new Articles
  @curation.fetch
    success: (curation) ->
      res.locals.sd.CURATION = curation.toJSON()
      videoIndex = 0
      cbs = []
      if @curation.get('sub_articles').length
        cbs.push () ->
          @veniceSubArticles.fetch
            data: ids: @curation.get('sub_articles')
      else
        cbs.push (cb) -> console.log 'in empty callback'
      # console.log cbs
      Q.all(cbs)
      .then =>
        if req.params.slug
          videoIndex = setVideoIndex(curation, req.params.slug)
          unless videoIndex or videoIndex is 0
            return res.redirect 301, '/venice-biennale'
        res.locals.sd.VIDEO_INDEX = videoIndex
        res.render 'components/venice_2017/templates/index',
          videoIndex: videoIndex
          curation: curation
          sub_articles: @veniceSubArticles?.toJSON()
    error: next

@vanity = (req, res, next) ->
  proxy = httpProxy.createProxyServer(changeOrigin: true, ignorePath: true)
  whitelistedAssets = WHITELISTED_VANITY_ASSETS
  return next() unless req.params[0].match whitelistedAssets
  req.headers['host'] = VANITY_BUCKET
  target = 'https://' + VANITY_BUCKET + '.s3.amazonaws.com' + '/' + req.params[0]
  proxy.web req, res, target: target, (err) ->
    res.redirect 301, '/articles' if err

setVideoIndex = (curation, slug) ->
  for section, i in curation.get 'sections'
    if section.slug is slug
      return i