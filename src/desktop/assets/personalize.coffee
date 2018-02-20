require('backbone').$ = $
sd = require('sharify').data

$ ->
  require('../apps/personalize/client/index.coffee').init()
