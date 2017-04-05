require('backbone').$ = $
require('jquery-ui')
require('blueimp-file-upload')
require('jquery.iframe-transport')

routes =
  '/about': ->
    require('../apps/about/client/index').init()
    require('../apps/about/client/easter_egg')()

  '/contact': require('../apps/contact/client/index').init

  '/feature': require('../apps/feature/client/index').init

  '/jobs': require('../apps/jobs/client/index').init

  '/personalize': require('../apps/personalize/client/index').init

  '/professional-buyer': -> require('../apps/pro_buyer/client/index')

  '/style-guide': require('../apps/style_guide/client/index').init

  '/unsubscribe': require('../apps/unsubscribe/client/index').init

  '/consign': require('../apps/consignments/client/index')

  '/users/auth': require('../apps/auth/client/index').init

  '/reset_password': require('../apps/auth/client/index').init

  '/signup': require('../apps/auth/client/auth').init

  '/login': require('../apps/auth/client/auth').init

  '/works-for-you': require('../apps/notifications/client/index').init

  '/profile/.*': require('../apps/user/client/index').init

  '/user/.*': require('../apps/user/client/index').init

  '/search': require('../apps/search/client/index').init

  '/artsy-primer/.*': require('../apps/artsy_primer/client.js').default

  '/primer-digest/.*': require('../apps/artsy_primer/client.js').default

  '/artsy-primer-personalize': require('../apps/artsy_primer/personalize/client/index').init

for path, init of routes
  $(init) if location.pathname.match path
