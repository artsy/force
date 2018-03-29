sd = require('sharify').data
require('backbone').$ = $

$ ->
  if location.pathname is '/articles'
    require('../apps/articles/client/magazine.coffee').init()
  else if location.pathname is '/news'
    require('../apps/articles/client/news.js').init()
  else if location.pathname is '/' + sd.SECTION?.slug
    require('../apps/articles/client/section.coffee').init()
  else if location.pathname is '/' + sd.CHANNEL?.slug
    require('../apps/articles/client/team_channel.coffee').init()
