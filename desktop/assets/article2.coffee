require('backbone').$ = $
sd = require('sharify').data

layout = sd.ARTICLE?.layout

$ ->
  if location.pathname.match('article2')
    if layout is 'classic'
      { init } = require('../apps/article2/client/classic.js')
      init()
    else
      { init } = require('../apps/article2/client/article.js')
      init()
