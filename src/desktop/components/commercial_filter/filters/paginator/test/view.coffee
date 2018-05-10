_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Params = require '../../../models/params'
categories = require '../../../../../apps/collect/fixtures/categories.json'
{ resolve } = require 'path'

describe 'Paginator', ->
  PaginatorView = null
  view = null

  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        sd: {}
      Backbone.$ = $
      PaginatorView = benv.requireWithJadeify resolve(__dirname, '../paginator_view'), ['template']
      done()

  after ->
    benv.teardown()

  setup = (page, hidePageNumbers = false) ->
    # 3 pages total
    view = new PaginatorView
      hidePageNumbers: hidePageNumbers
      params: new Backbone.Model({
        page: page
        size: 20
      })
      filter: new Backbone.Model({
        total: 60
      })

    view.render()
    view

  describe 'show pagination numbers', ->
    it 'shows next page and page numbers, hides previous page button when page is 1', ->
      view = setup(1)

      view.$el.find('ul:first-child').html().should.containEql('paginator-current is-active')
      view.$el.find('ul:last-child').html().should.containEql('paginator-next')

    it 'shows prev / next and page / page numbers when page is greater than 1 and less than total', ->
      view = setup(2)
      view.$el.find('ul:first-child').html().should.containEql('paginator-previous')
      view.$el.find('ul:nth-child(2) li:nth-child(1)').html().should.containEql('page=1')
      view.$el.find('ul:nth-child(2) li:nth-child(2)').html().should.containEql('paginator-current is-active')
      view.$el.find('ul:nth-child(2) li:nth-child(3)').html().should.containEql('page=3')
      view.$el.find('ul:last-child').html().should.containEql('paginator-next')

    it 'hides next button when page equals total, shows previous', ->
      view = setup(3)
      view.$el.find('ul:first-child').html().should.containEql('paginator-previous')
      view.$el.find('ul:last-child li:nth-child(1)').html().should.containEql('page=1')
      view.$el.find('ul:last-child li:nth-child(2)').html().should.containEql('page=2')
      view.$el.find('ul:last-child li:nth-child(3)').html().should.containEql('paginator-current is-active')

  describe 'hide pagination numbers', ->
    it 'hides previous page when page is 1', ->
      view = setup(1, true)
      view.$el.find('ul:first-child')[0].outerHTML.should.containEql('display: none')
      view.$el.find('ul:last-child').html().should.containEql('paginator-next')

    it 'shows prev / next when page is greater than 1 and less than total', ->
      view = setup(2, true)
      view.$el.find('ul:first-child')[0].outerHTML.should.not.containEql('display: none')
      view.$el.find('ul:first-child').html().should.containEql('paginator-previous')
      view.$el.find('ul:last-child').html().should.containEql('paginator-next')

    it 'hides next button when page equals total', ->
      view = setup(3, true)
      view.$el.find('ul:first-child').html().should.containEql('paginator-previous')
      view.$el.find('ul:last-child')[0].outerHTML.should.containEql('display: none')

