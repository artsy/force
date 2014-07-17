require('backbone').$ = $
$ ->
  switch location.pathname
    when '/browse', '/browse/artworks' then require('../apps/browse/client.coffee').index()
    when '/categories' then require('../apps/browse/client.coffee').categories()