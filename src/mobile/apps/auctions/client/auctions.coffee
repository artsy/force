bootstrap = require '../../../components/layout/bootstrap'
{ AvantGardeTabsView } = require '../../../components/avant_garde_tabs/view'

module.exports.init = ->
  bootstrap()
  new AvantGardeTabsView
    el: $ '#auction-page'
