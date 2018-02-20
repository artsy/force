sd = require('sharify').data
require('backbone').$ = $

if location.pathname is '/art-fairs'
  $ require('../apps/fairs/client/index.coffee').init
else if location.pathname.match('/.*/info.*')
  $ require('../apps/fair_info/client/index.coffee').init
else if sd.FAIR_ORGANIZER
  $ require('../apps/fair_organizer/client/index.coffee').init
else
  $ require('../apps/fair/client/index.coffee').init
