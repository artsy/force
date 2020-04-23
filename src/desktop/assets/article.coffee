require('backbone').$ = $
sd = require('sharify').data

layout = sd.ARTICLE?.layout

$ ->
  if location.pathname.match('/article/|/video/|/series/|/news/')
    { init } = require('../apps/article/client/article.tsx')
    init()
