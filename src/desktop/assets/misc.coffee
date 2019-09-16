require('backbone').$ = $
require('jquery-ui')
require('blueimp-file-upload')
require('jquery.iframe-transport')
qs = require 'qs'

routes =
  '/about': ->
    require('../apps/about/client/index.coffee').init()
    require('../apps/about/client/easter_egg.coffee')()

  '/contact': require('../apps/contact/client/index.coffee').init

  '/feature': require('../apps/feature/client/index.coffee').init

  '/jobs': require('../apps/jobs/client/index.coffee').init

  '/unsubscribe': require('../apps/unsubscribe/client/index.coffee').init

  '/consign/submission': require('../apps/consign/client/submission.js').default

  '/consign': require('../apps/consign/client/index.js').default

  '/reset_password': require('../apps/authentication/client/reset_password.coffee').init

  '/works-for-you': ->
    require('../apps/notifications/client/index.coffee').init()
    { artist, artist_id } = qs.parse(location.search.substring(1))
    require('../apps/notifications/client/react_grid.js').default.setupReactGrid({ artistID: (artist || artist_id) })

  '/profile/.*': require('../apps/user/client/index.coffee').init

  '/user/.*': require('../apps/user/client/index.coffee').init

  '/search': require('../apps/search/client/index.coffee').init

for path, init of routes
  $(init) if location.pathname.match path
