sd = require('sharify').data
require('backbone').$ = $

$ ->
  if location.pathname.match '/article/.*'
    require('../apps/article/client/index.coffee').init()
