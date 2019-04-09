_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Serializer = require '../serializer'
{ template } = require './fixture'

describe 'Serializer', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @$form = $(template)
    @serializer = new Serializer @$form

  describe '#data', ->
    it 'should return all named inputs as keys regardless of values', ->
      @serializer.data().should.have.keys 'name', 'email', 'comment', 'yes', 'no'

    it 'should return all values corresponding to keys', ->
      values = name: 'Foo Bar', email: 'foo@bar.com', comment: 'Baz Qux Whatever', yes: true, no: false

      @$form.find('input[name="name"]').val values.name
      @$form.find('input[name="email"]').val values.email
      @$form.find('textarea[name="comment"]').val values.comment

      @serializer.data().should.containEql values

    it 'should sanitize HTML', ->
      values = name: '<script src=http://xss.rocks/xss.js></script>'

      @$form.find('input[name="name"]').val values.name

      @serializer.data().should.containEql name: "&lt;script src=http://xss.rocks/xss.js>&lt;/script>"

    describe 'multi-selects', ->
      beforeEach ->
        sinon.stub($.fn, 'serializeArray').returns [
          { name: 'foo', value: 'bar' }
          { name: 'foo', value: 'baz' }
          { name: 'foo', value: 'qux' }
        ]

      afterEach ->
        $.fn.serializeArray.restore()

      it 'properly handles multiple values on the same key', ->
        @serializer.data().foo.should.eql ['bar', 'baz', 'qux']
