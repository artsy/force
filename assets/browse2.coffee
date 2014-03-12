require('backbone').$  = $
$ ->
  switch location.pathname
    when '/browse2' then require('../apps/browse2/client.coffee').init()