Backbone = require 'backbone'
PartnersRouter = require './router.coffee'

module.exports = ->
  partnersRoot = sd.PARTNERS_ROOT
  partnersType = if partnersRoot is 'galleries' then 'gallery' else 'institution'
  router = new PartnersRouter type: partnersType
  Backbone.history.start root: partnersRoot, pushState: true