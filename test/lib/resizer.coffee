sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'

{ fill, crop, resize } = resizer = rewire '../../lib/resizer'

describe 'using the proxy', ->
  before ->
    resizer.__set__ 'USE_RESIZE_PROXY', true

  describe '#crop', ->
    it 'returns the appropriate URL', ->
      crop('http://foobar.jpg', 32, 32).
        should.equal 'https://i.embed.ly/1/display/crop?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=32&height=32&quality=95'

    it 'supports options', ->
      crop('http://foobar.jpg', 300, 200, quality: 50).
        should.equal 'https://i.embed.ly/1/display/crop?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=300&height=200&quality=50'

  describe '#resize', ->
    it 'returns the appropriate URL', ->
      resize('http://foobar.jpg', 32, 32).
        should.equal 'https://i.embed.ly/1/display/resize?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=32&height=32&quality=95&grow=true'

    it 'supports options', ->
      resize('http://foobar.jpg', 300, 200, quality: 50, grow: false).
        should.equal 'https://i.embed.ly/1/display/resize?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=300&height=200&quality=50&grow=false'

  describe '#fill', ->
    it 'returns the appropriate URL', ->
      fill('http://foobar.jpg', 32, 32).
        should.equal 'https://i.embed.ly/1/display/fill?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=32&height=32&quality=95&color=fff'

    it 'supports options', ->
      fill('http://foobar.jpg', 300, 200, quality: 50, color: 'ff00cc').
        should.equal 'https://i.embed.ly/1/display/fill?key=a1f82558d8134f6cbebceb9e67d04980&url=http%3A%2F%2Ffoobar.jpg&width=300&height=200&quality=50&color=ff00cc'

describe 'not using the proxy', ->
  before ->
    resizer.__set__ 'USE_RESIZE_PROXY', false

  describe '#crop', ->
    it 'should return the url that was passed in', ->
      crop('http://foobar.jpg', 32, 32).should.equal 'http://foobar.jpg'

  describe '#resize', ->
    it 'should return the url that was passed in', ->
      resize('http://foobar.jpg', 32, 32).should.equal 'http://foobar.jpg'

  describe '#fill', ->
    it 'should return the url that was passed in', ->
      fill('http://foobar.jpg', 32, 32).should.equal 'http://foobar.jpg'
