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
      heading: 'Current Show'
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  it 'with no image', (done) ->
    benv.render resolve(__dirname, '../../../components/current_item/index.jade'), {
      currentItem: _.extend {}, @item, imageUrl: null
      viewHelpers: helpers
    }, =>
      $('.current-item').attr('href').should.eql '/foo/bar'
      $('.current-item__image').length.should.eql 0
      $('.current-item__label').text().should.eql 'Current Show'
      $('.current-item__name').text().should.eql 'Foo Bar'
      $('.current-item__detail').text().should.eql 'Item Detail'
      done()

  it 'with an image', ->
    benv.render resolve(__dirname, '../../../components/current_item/index.jade'), {
      currentItem: _.extend {}, @item
      viewHelpers: helpers
    }, =>
      $('.current-item').attr('href').should.eql '/foo/bar'
      $('.current-item__image').attr('src').should.eql '/foo.jpg'
      $('.current-item__label').text().should.eql 'Current Show'
      $('.current-item__name').text().should.eql 'Foo Bar'
      $('.current-item__detail').text().should.eql 'Item Detail'
      done()
