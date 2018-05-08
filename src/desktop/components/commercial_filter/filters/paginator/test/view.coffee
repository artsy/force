_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'Paginator', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      @PaginatorView = benv.requireWithJadeify resolve(__dirname, '../paginator_view'), ['template']
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @PaginatorView
      params: new Backbone.Model()
      filter: new Backbone.Model()

  describe 'hide pagination numbers', ->
    it 'hides previous page when page is 1', ->
      @view = new @PaginatorView
        hidePageNumbers: true
        params: new Backbone.Model({
          page: 1
          size: 2
        })
        filter: new Backbone.Model({
          total: 2
        })

      @view.render()

    it 'shows prev / next when page is greater than 1 and less than total', ->

    it 'hides next button when page equals total', ->

