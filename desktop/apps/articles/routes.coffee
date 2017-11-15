{ sortBy, pluck, reject, map, last, first } = require 'underscore'
Q = require 'bluebird-q'
sd = require('sharify').data
Article = require '../../models/article'
Articles = require '../../collections/articles'
Section = require '../../models/section'
Sections = require '../../collections/sections'
Channel = require '../../models/channel'
embed = require 'particle'
request = require 'superagent'
{ crop } = require '../../components/resizer'
{ SAILTHRU_KEY, SAILTHRU_SECRET, GALLERY_INSIGHTS_SECTION_ID, PARSELY_KEY, PARSELY_SECRET } = require '../../config'
sailthru = require('sailthru-client').createSailthruClient(SAILTHRU_KEY,SAILTHRU_SECRET)
{ stringifyJSONForWeb } = require '../../components/util/json.coffee'
{ topParselyArticles } = require '../../components/util/parsely.coffee'
positronql = require '../../lib/positronql.coffee'
query = require './queries/editorial_articles.coffee'

@articles = (req, res, next) ->
  send =
    query: query,
    variables:
      id: req.params.id

  return if positronql.debug req, res, send

  positronql send
    .then (result) ->
      articles = new Articles result.articles
      user = res.locals.sd.CURRENT_USER
      setupEmailSubscriptions user, (results) ->
        res.locals.sd.SUBSCRIBED_TO_EDITORIAL = results.editorial
        res.locals.sd.ARTICLES = articles.toJSON()
        res.render 'articles',
          articles: articles
          crop: crop

    .catch next

setupEmailSubscriptions = (user, cb) ->
  return cb({ editorial: false }) unless user?.email
  subscribedToEditorial user.email, (err, isSubscribed) ->
    cb { editorial: isSubscribed }

@redirectMagazine = (req, res, next) ->
  res.redirect 301, req.url.replace 'magazine', 'articles'

# Deprecated - only must-have is VB2015 and will eventually be removed
@section = (req, res, next) ->
  new Section(id: 'venice-biennale-2015').fetch
    cache: true
    error: -> next()
    success: (section) ->
      new Articles().fetch
        data:
          published: true
          limit: 100
          sort: '-published_at'
          section_id: section.get('id')
        error: res.backboneError
        success: (articles) ->
          res.locals.sd.ARTICLES = articles.toJSON()
          res.locals.sd.SECTION = section.toJSON()
          res.render 'section', section: section, articles: articles

@teamChannel = (req, res, next) ->
  slug = req.path.split('/')[1]
  new Channel(id: slug).fetch
    error: -> res.backboneError
    success: (channel) ->
      return next() unless channel.isTeam()
      topParselyArticles channel.get('name'), null, PARSELY_KEY, PARSELY_SECRET, (parselyArticles) ->
        new Articles().fetch
          data:
            published: true
            limit: 6
            sort: '-published_at'
            ids: pluck(sortBy(channel.get('pinned_articles'), 'index'), 'id')
          error: res.backboneError
          success: (pinnedArticles) ->
            pinnedArticles.reset() if channel.get('pinned_articles').length is 0
            pinnedSlugs = pinnedArticles.map (article) -> article.get('slug')
            parselyArticles = reject parselyArticles, (post) ->
              slug = last post.link.split('/')
              slug in pinnedSlugs
            numRemaining = 6 - pinnedArticles.size()
            parselyArticles = first(parselyArticles, numRemaining)

            res.locals.sd.CHANNEL = channel.toJSON()
            res.render 'team_channel',
              channel: channel
              pinnedArticles: pinnedArticles
              parselyArticles: parselyArticles

subscribedToEditorial = (email, cb) ->
  sailthru.apiGet 'user', { id: email }, (err, response) ->
    return cb err, false if err
    cb null, response.vars?.receive_editorial_email

@editorialForm = (req, res, next) ->
  sailthru.apiPost 'user',
    id: req.body.email
    lists:
      "#{sd.SAILTHRU_MASTER_LIST}": 1
    name: req.body.name
    vars:
      source: req.body.source or 'editorial'
      receive_editorial_email: true
      email_frequency: 'daily'
  , (err, response) ->
    if response.ok
      sailthru.apiPost 'event',
        event: 'editorial_welcome'
        id: req.body.email
      , (err, response) ->
        res.send req.body
    else
      res.status(500).send(response.errormsg)
