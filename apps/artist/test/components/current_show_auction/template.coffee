_ = require 'underscore'
jade = require 'jade'
fs = require 'fs'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'
helpers = require '../../../view_helpers'

describe 'current auction or show', ->
  before (done) ->
    @item =
      imageUrl: '/foo.jpg',
      name: 'Foo Bar',
      href: '/foo/bar'
      detail: 'Item Detail'
      secondaryName: 'Foo Bar Baz'

    benv.setup =>
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  it 'with no image', (done) ->
    benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
      currentItem: _.extend {}, @item, hasMany: false, type: 'show', imageUrl: null
      viewHelpers: helpers
    }, =>
      $('.current-item-image').length.should.eql 0
      $('.current-item-label').text().should.eql 'In Current Show'
      $($('.current-item-name')[0]).text().should.eql 'Foo Bar'
      $($('.current-item-name')[1]).text().should.eql 'Foo Bar Baz'
      $('.current-item-detail').text().should.eql 'Item Detail'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()

  describe 'with current show', ->
    it 'with one show', (done) ->
      benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
        currentItem: _.extend {}, @item, hasMany: false, type: 'show'
        viewHelpers: helpers
      }, =>
        $('.current-item-image').attr('src').should.eql '/foo.jpg'
        $('.current-item-label').text().should.eql 'In Current Show'
        $($('.current-item-name')[0]).text().should.eql 'Foo Bar'
        $($('.current-item-name')[1]).text().should.eql 'Foo Bar Baz'
        $('.current-item-detail').text().should.eql 'Item Detail'
        $('.current-item-left').attr('href').should.eql '/foo/bar'
        $('.current-item-right').attr('href').should.eql '/foo/bar'
        done()

    it 'with many shows', (done) ->
      benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
        currentItem: _.extend {}, @item, hasMany: true, type: 'show'
        viewHelpers: helpers
      }, =>
        $('.current-item-image').attr('src').should.eql '/foo.jpg'
        $('.current-item-label').text().should.eql 'Featured Show'
        $($('.current-item-name')[0]).text().should.eql 'Foo Bar'
        $($('.current-item-name')[1]).text().should.eql 'Foo Bar Baz'
        $('.current-item-detail').text().should.eql 'Item Detail'
        $('.current-item-left').attr('href').should.eql '/foo/bar'
        $('.current-item-right').attr('href').should.eql '/foo/bar'
        done()

  describe 'with current auction', ->
    it 'with one auction', (done) ->
      benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
        currentItem: _.extend {}, @item, hasMany: false, type: 'auction'
        viewHelpers: helpers
      }, =>
        $('.current-item-image').attr('src').should.eql '/foo.jpg'
        $('.current-item-label').text().should.eql 'In Current Auction'
        $($('.current-item-name')[0]).text().should.eql 'Foo Bar'
        $($('.current-item-name')[1]).text().should.eql 'Foo Bar Baz'
        $('.current-item-detail').text().should.eql 'Item Detail'
        $('.current-item-left').attr('href').should.eql '/foo/bar'
        $('.current-item-right').attr('href').should.eql '/foo/bar'
        done()

    it 'with many auctions', (done) ->
      benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
        currentItem: _.extend {}, @item, hasMany: true, type: 'auction'
        viewHelpers: helpers
      }, =>
        $('.current-item-image').attr('src').should.eql '/foo.jpg'
        $('.current-item-label').text().should.eql 'In Current Auction'
        $($('.current-item-name')[0]).text().should.eql 'Foo Bar'
        $($('.current-item-name')[1]).text().should.eql 'Foo Bar Baz'
        $('.current-item-detail').text().should.eql 'Item Detail'
        $('.current-item-left').attr('href').should.eql '/foo/bar'
        $('.current-item-right').attr('href').should.eql '/foo/bar'
        done()
