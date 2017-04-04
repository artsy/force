require('backbone').$ = $

routes =
  '''
  /auctions
  /auctions/reminders
  ''': require('../apps/auctions/client/index.coffee').init

  # TODO: refactor to check paths in order.
  # Discussion here: https://github.com/artsy/force/pull/1126
  '''
  /sale/.*
  ^/auction/[^/]+/?$
  ''': require('../apps/auction2/client/index.js').default

  '''
  /artist/.*/auction-results
  /artist/.*/auction-result/.*
  /artwork/.*/auction-results
  ''': require('../apps/auction_lots/client/index.coffee').init

  '''
  /auction-registration/.*
  /auction/.*/bid/.*
  /auction/.*/buyers-premium
  /feature/.*/bid/.*
  ''': require('../apps/auction_support/client/index.coffee').init

  '''
  /how-auctions-work
  /how-auctions-work/edit
  ''': require('../apps/how_auctions_work/client/index.coffee').init

for paths, init of routes
  for path in paths.split('\n')
    $(init) if location.pathname.match path
