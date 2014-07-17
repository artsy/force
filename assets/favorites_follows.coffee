require('backbone').$ = $
$ ->
  switch location.pathname
    when '/following/artists', '/following/genes'
      require('../apps/favorites_follows/client/follows.coffee').init()
    when '/favorites'
      require('../apps/favorites_follows/client/favorites.coffee').init()