require('backbone').$ = $
require('jquery-ui')
require('blueimp-file-upload')
require('jquery.iframe-transport')

routes =
  '/about': ->
    require('../apps/about/client/index.coffee').init()
    require('../apps/about/client/easter_egg.coffee')()

  '/contact': require('../apps/contact/client/index.coffee').init

  '/feature': require('../apps/feature/client/index.coffee').init

  '/jobs': require('../apps/jobs/client/index.coffee').init

  '/professional-buyer': require('../apps/pro_buyer/client/index.coffee')

  '/style-guide': require('../apps/style_guide/client/index.coffee').init

  '/unsubscribe': require('../apps/unsubscribe/client/index.coffee').init

  '/consign/submission': require('../apps/consign/client/submission.js').default

  '/consign': require('../apps/consign/client/index.js').default

  '/reset_password': require('../apps/auth/client/index.coffee').init

  # TODO: remove 2 after auth2
  '/reset_password2': requre('../apps/auth2/client/reset_password.coffee').init

  '/signup': require('../apps/auth/client/auth.coffee').init

  '/login': require('../apps/auth/client/auth.coffee').init

  '/works-for-you': require('../apps/notifications/client/index.coffee').init

  '/profile/.*': require('../apps/user/client/index.coffee').init

  '/user/.*': require('../apps/user/client/index.coffee').init

  '/search': require('../apps/search/client/index.coffee').init

  '/artsy-primer/.*': require('../apps/artsy_primer/client.js').default

  '/primer-digest/.*': require('../apps/artsy_primer/client.js').default

  '/artsy-primer-personalize': require('../apps/artsy_primer/personalize/client/index.coffee').init

for path, init of routes
  $(init) if location.pathname.match path
