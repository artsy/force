_ = require 'underscore'
bootstrap = require '../../../components/layout/bootstrap.coffee'
AvantGardeTabsView = require '../../../components/avant_garde_tabs/view.coffee'

module.exports.init = ->
  bootstrap()
  new AvantGardeTabsView
    el: $ '#auction-page'
