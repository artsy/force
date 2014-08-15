sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'

{ fill, crop, resize } = resizer = rewire '../../lib/resizer'

describe 'using the proxy', ->
  before ->
    resizer.__set__ 'USE_RESIZE_PROXY', true

  describe '#crop', ->
    it 'returns the appropriate URL', ->
      crop('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/crop?width=32&height=32&quality=95&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

    it 'supports options', ->
      crop('http://foobar.jpg', width: 300, height: 200, quality: 50).
        should.equal 'https://i.embed.ly/1/display/crop?width=300&height=200&quality=50&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

  describe '#resize', ->
    it 'returns the appropriate URL', ->
      resize('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/resize?width=32&height=32&quality=95&grow=false&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

    it 'supports options', ->
      resize('http://foobar.jpg', width: 300, height: 200, quality: 50, grow: true).
        should.equal 'https://i.embed.ly/1/display/resize?width=300&height=200&quality=50&grow=true&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

  describe '#fill', ->
    it 'returns the appropriate URL', ->
      fill('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/fill?width=32&height=32&quality=95&color=fff&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

    it 'supports options', ->
      fill('http://foobar.jpg', width: 300, height: 200, quality: 50, color: 'ff00cc').
        should.equal 'https://i.embed.ly/1/display/fill?width=300&height=200&quality=50&color=ff00cc&url=http%3A%2F%2Ffoobar.jpg&key=a1f82558d8134f6cbebceb9e67d04980'

describe 'not using the proxy', ->
  before ->
    resizer.__set__ 'USE_RESIZE_PROXY', false

  describe '#crop', ->
    it 'should return the url that was passed in', ->
      crop('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'

  describe '#resize', ->
    it 'should return the url that was passed in', ->
      resize('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'

  describe '#fill', ->
    it 'should return the url that was passed in', ->
      fill('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'
