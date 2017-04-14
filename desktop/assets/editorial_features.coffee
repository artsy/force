require('backbone').$ = $
$ ->
  if location.pathname is '/2016-year-in-art'
    require('../apps/editorial_features/components/eoy/client.coffee').init