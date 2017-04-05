sd = require('sharify').data
require('backbone').$ = $

$ ->
  if location.pathname is '/articles'
    require('../apps/articles/client/magazine').init()
  else if location.pathname is '/' + sd.SECTION?.slug
    require('../apps/articles/client/section').init()
  else if location.pathname is '/' + sd.CHANNEL?.slug
    require('../apps/articles/client/team_channel').init()
