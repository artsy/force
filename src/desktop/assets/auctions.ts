import $ from "jquery"

const routes = {
  [`\
/auction-registration/.*
/auction/.*/bid/.*
/auction/.*/buyers-premium\
`]: require("../apps/auction_support/client/index.coffee").init,

  [`\
/auctions\
`]: require("../apps/auctions/client/index.coffee").init,

  
  
  [`\
/auctions2\
`]: require("../apps/auctions2/client.js").default,

  

[`\
/how-auctions-work
/how-auctions-work/edit\
`]: require("../apps/how_auctions_work/client/index.coffee").init,

  // TODO: refactor to check paths in order.
// Discussion here: https://github.com/artsy/force/pull/1126
[`\
/sale/.*
^/auction/[^/]+/?$
/auction/.*/confirm-registration
/auction/.*/registration-flow\
`]: require("../apps/auction/client.js").default,
}

for (let paths in routes) {
  const init = routes[paths]
  for (let path of Array.from(paths.split("\n"))) {
    if (location.pathname.match(path)) {
      $(init)
    }
  }
}
