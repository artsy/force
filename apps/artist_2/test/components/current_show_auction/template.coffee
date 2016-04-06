_ = require 'underscore'
jade = require 'jade'
fs = require 'fs'
benv = require 'benv'
{ resolve } = require 'path'
sinon = require 'sinon'
helpers = require '../../../view_helpers'

describe 'Current auction of show', ->
  before (done) ->
    @item =
      start_at: '2016-09-01T12:00:00+00:00',
      end_at: '2016-12-05T12:00:00+00:00',
      imageUrl: '/foo.jpg',
      name: 'Foo Bar',
      href: '/foo/bar'
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
      $('.current-item-name').text().should.eql 'Foo Bar'
      $('.current-item-duration').text().should.eql 'Sep. 1st – Dec. 5th'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()

  it 'with one show', (done) ->
    benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
      currentItem: _.extend {}, @item, hasMany: false, type: 'show'
      viewHelpers: helpers
    }, =>
      $('.current-item-image').attr('src').should.eql '/foo.jpg'
      $('.current-item-label').text().should.eql 'In Current Show'
      $('.current-item-name').text().should.eql 'Foo Bar'
      $('.current-item-duration').text().should.eql 'Sep. 1st – Dec. 5th'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()

  it 'with many shows', ->
    benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
      currentItem: _.extend {}, @item, hasMany: true, type: 'show'
      viewHelpers: helpers
    }, =>
      $('.current-item-image').attr('src').should.eql '/foo.jpg'
      $('.current-item-label').text().should.eql 'Featured Show'
      $('.current-item-name').text().should.eql 'Foo Bar'
      $('.current-item-duration').text().should.eql 'Sep. 1st – Dec. 5th'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()

  it 'with one auction', ->
    benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
      currentItem: _.extend {}, @item, hasMany: false, type: 'auction'
      viewHelpers: helpers
    }, =>
      $('.current-item-image').attr('src').should.eql '/foo.jpg'
      $('.current-item-label').text().should.eql 'In Current Auction'
      $('.current-item-name').text().should.eql 'Foo Bar'
      $('.current-item-duration').text().should.eql 'Sep. 1st – Dec. 5th'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()

  it 'with one auction', ->
    benv.render resolve(__dirname, '../../../components/current_show_auction/index.jade'), {
      currentItem: _.extend {}, @item, hasMany: true, type: 'auction'
      viewHelpers: helpers
    }, =>
      $('.current-item-image').attr('src').should.eql '/foo.jpg'
      $('.current-item-label').text().should.eql 'In Current Auction'
      $('.current-item-name').text().should.eql 'Foo Bar'
      $('.current-item-duration').text().should.eql 'Sep. 1st – Dec. 5th'
      $('.current-item-left').attr('href').should.eql '/foo/bar'
      $('.current-item-right').attr('href').should.eql '/foo/bar'
      done()