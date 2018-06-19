require('backbone').$ = $

routes =
  '''
  /auctions
  ''': require('../apps/auctions/client/index.coffee').init

  '''
  /auctions2
  ''': require('../apps/auctions2/client.js').default

  # TODO: refactor to check paths in order.
  # Discussion here: https://github.com/artsy/force/pull/1126
  '''
  /sale/.*
  ^/auction/[^/]+/?$
  /auction/.*/confirm-registration
  /auction/.*/registration-flow
  ''': require('../apps/auction/client.js').default

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
