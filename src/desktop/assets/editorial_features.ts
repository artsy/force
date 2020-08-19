import $ from "jquery"
const VeniceView = require("../apps/editorial_features/components/venice_2017/client/index.coffee")

$(function () {
  if (location.pathname === "/2016-year-in-art") {
    return require("../apps/editorial_features/components/eoy/client.coffee").init()
  } else if (location.pathname.indexOf("/venice-biennale") > -1) {
    return new VeniceView({ el: $(".venice-feature") })
  } else if (location.pathname.indexOf("/gender-equality") > -1) {
    return require("../apps/editorial_features/components/gucci/client.js").default()
  }
})
