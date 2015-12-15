Backbone = require 'backbone'
qs = require 'querystring'
SearchView = require './routes/search_view.coffee'

module.exports = class PartnersRouter extends Backbone.Router
  routes:
    '(?*paramsString)': 'partners'
    'all' : 'partnersSearch'

  index: require './routes/index.coffee'

  initialize: ({ @type }) ->

  partnersSearch: (paramsString) ->
    params = new Backbone.Model _.extend qs.parse(paramsString),
      type: if @type is 'gallery' then 'PartnerGallery' else 'PartnerInstitution',
      cache: true

    @searchView ?= new SearchView { params: params }
    params.on 'change', =>
      @searchView.update()
      @navigateParams params
    @searchView.update()

  partners: (paramsString)->
    if paramsString then return @partnersSearch paramsString
    @index @type

  navigateParams: (params) =>
    paramsJSON = qs.stringify(_.omit params.toJSON(), 'cache', 'type')

    if paramsJSON?.length
      @navigate "#?#{paramsJSON}", replace: true
    else @navigate "/all", replace: true
    @firstLoad = false