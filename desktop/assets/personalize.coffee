require('backbone').$ = $
sd = require('sharify').data

$ ->
  if location.pathname.match('/personalize*')
    require('../apps/personalize/client/index.coffee').init()
  else
    require('../apps/personalize/client/onboarding.js').init()
