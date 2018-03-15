require('backbone').$ = $
sd = require('sharify').data

layout = sd.ARTICLE?.layout

$ ->
  if location.pathname.match('/article/|/video/|/series/|/news/')
    if layout is 'classic'
      { init } = require('../apps/article/client/classic.js')
      init()
    else
      { init } = require('../apps/article/client/article.js')
      init()
