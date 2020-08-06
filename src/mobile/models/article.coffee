_ = require 'underscore'
_s = require 'underscore.string'
sd = require('sharify').data
moment = require 'moment'
Backbone = require 'backbone'
Artworks = require '../collections/artworks.coffee'
Section = require './section.coffee'
Partner = require './partner.coffee'
Fair = require './fair.coffee'
{ crop, resize } = require '../components/resizer/index.coffee'
{ compactObject } = require './mixins/compact_object.coffee'

module.exports = class Article extends Backbone.Model

  defaults:
    sections: []

  urlRoot: "#{sd.POSITRON_URL}/api/articles"

  href: ->
    "/article/#{@get('slug')}"

  fullHref: ->
    "#{sd.APP_URL}/article/#{@get('slug')}"

  date: (attr = 'published_at') ->
    moment @get(attr)

  formatDate: ->
    @date('published_at').format('MMMM Do')

  related: ->
    return @__related__ if @__related__?
    @__related__ =
      author: new Backbone.Model(@get 'author')

  cropUrlFor: (attr, args...) ->
    crop @get(attr), args...

  authorHref: ->
    if @get('author') then "/#{@get('author').profile_handle}" else @href()

  shareDescription: ->
    (@get('share_description') or @get('thumbnail_title')) + " @artsy"

  isFairArticle: ->
    # associated to a fair and the Fairs team has written it
    @get('fair_ids')?.length > 0 and @get('channel_id') is sd.FAIR_CHANNEL_ID

  fetchRelated: (options) ->
    Articles = require '../collections/articles.coffee'
    dfds = []
    channel_id = @get('channel_id') or @get('partner_channel_id') or sd.ARTSY_EDITORIAL_CHANNEL
    dfds.push (footerArticles = new Articles).fetch
      cache: true
      data:
        published: true
        sort: '-published_at'
        channel_id: channel_id

    if @get('partner_channel_id')
      dfds.push (partner = new Partner(id: @get('partner_channel_id'))).fetch(cache: true)

    if @isFairArticle()
      dfds.push (fair = new Fair(id: @get('fair_ids')[0])).fetch(cache: true)

    Promise.allSettled(dfds).then =>
      footerArticles.remove @ if footerArticles
      options.success(
        article: this
        footerArticles: footerArticles
        partner: partner if partner
        fair: fair
      )

  toJSONLD: ->
    creator = []
    creator.push @get('author').name if @get('author')
    creator = _.union(creator, _.pluck(@get('contributing_authors'), 'name')) if @get('contributing_authors').length
    compactObject {
      "@context": "http://schema.org"
      "@type": "NewsArticle"
      "headline": @get('thumbnail_title')
      "url": "#{sd.APP_URL}" + @href()
      "thumbnailUrl": @get('thumbnail_image')
      "dateCreated": @get('published_at')
      "articleSection": if @get('section') then @get('section').get('title') else "Editorial"
      "creator": creator
      "keywords": @get('tags') if @get('tags').length
    }
