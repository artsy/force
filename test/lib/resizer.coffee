sinon     = require 'sinon'
Backbone  = require 'backbone'

{ crop, resize } = require '../../lib/resizer'

describe 'Crop', ->
  it 'returns the appropriate URL', ->
    crop('http://foobar.jpg', 32, 32).
      should.equal 'https://i.embed.ly/1/display/crop?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=32&height=32&quality=95'

  it 'supports options', ->
    crop('http://foobar.jpg', 300, 200, quality: 50).
      should.equal 'https://i.embed.ly/1/display/crop?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=300&height=200&quality=50'

describe 'Resize', ->
  it 'returns the appropriate URL', ->
    resize('http://foobar.jpg', 32, 32).
      should.equal 'https://i.embed.ly/1/display/resize?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=32&height=32&quality=95&grow=true'

  it 'supports options', ->
    resize('http://foobar.jpg', 300, 200, quality: 50, grow: false).
      should.equal 'https://i.embed.ly/1/display/resize?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=300&height=200&quality=50&grow=false'
