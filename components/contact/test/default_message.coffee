Backbone        = require 'backbone'
defaultMessage  = require '../default_message'

describe 'defaultMessage', ->
  beforeEach ->
    @model = new Backbone.Model artist: name: 'Foo Bar'
    @model.isPriceDisplayable = -> false

  it 'returns the default message if there is an artist', ->
    defaultMessage(@model).should.equal "Hello, I’m interested in this work by Foo Bar. Could you please confirm its availability and price? Thank you!"

  it 'returns the default message if there is no artist', ->
    defaultMessage(@model.unset 'artist').should.equal "Hello, I’m interested in this work. Could you please confirm its availability and price? Thank you!"

  it 'returns the default message if the price *can* be displayed', ->
    @model.isPriceDisplayable = -> true
    defaultMessage(@model).should.equal "Hello, I’m interested in this work by Foo Bar. Could you please confirm its availability? Thank you!"
