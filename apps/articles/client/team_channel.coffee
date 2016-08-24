_ = require 'underscore'
Articles = require '../../../collections/articles.coffee'
Channel = require '../../../models/channel.coffee'
ArticlesGridView = require '../../../components/articles_grid/view.coffee'
sd = require('sharify').data

module.exports.init = ->
  channel = new Channel sd.CHANNEL
  collection = new Articles
  collection.url = "#{collection.url}/?&published=true&limit=12&sort=-published_at&channel_id=#{channel.get('id')}"
  gridView = new ArticlesGridView
    el: $('.team-channel-grid')
    collection: articles
    header: 'Latest Articles'
  el.html '<div class="loading-spinner"></div>'
  collection.fetch()
