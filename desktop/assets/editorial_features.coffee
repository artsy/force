require('backbone').$ = $
$ ->
  if location.pathname is '/2016-year-in-art'
    require('../apps/editorial_features/components/eoy/client.coffee').init
  else if location.pathname.indexOf('/venice-biennale') > -1
    require('../apps/editorial_features/components/venice_2017/client.coffee').init()