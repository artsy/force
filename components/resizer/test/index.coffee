sinon = require 'sinon'
Backbone = require 'backbone'
rewire = require 'rewire'
{ fill, crop, resize, resizeWithGemini } = resizer = rewire '../index'

describe 'using the embedly proxy', ->
  before ->
    resizer.__set__ 'EMBEDLY_KEY', 'xxx'

  describe '#crop', ->
    it 'returns the appropriate URL', ->
      crop('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/crop?width=32&height=32&quality=95&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

    it 'supports options', ->
      crop('http://foobar.jpg', width: 300, height: 200, quality: 50).
        should.equal 'https://i.embed.ly/1/display/crop?width=300&height=200&quality=50&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

  describe '#resize', ->
    it 'returns the appropriate URL', ->
      resize('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/resize?width=32&height=32&quality=95&grow=false&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

    it 'supports options', ->
      resize('http://foobar.jpg', width: 300, height: 200, quality: 50, grow: true).
        should.equal 'https://i.embed.ly/1/display/resize?width=300&height=200&quality=50&grow=true&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

  describe '#fill', ->
    it 'returns the appropriate URL', ->
      fill('http://foobar.jpg', width: 32, height: 32).
        should.equal 'https://i.embed.ly/1/display/fill?width=32&height=32&quality=95&color=fff&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

    it 'supports options', ->
      fill('http://foobar.jpg', width: 300, height: 200, quality: 50, color: 'ff00cc').
        should.equal 'https://i.embed.ly/1/display/fill?width=300&height=200&quality=50&color=ff00cc&url=http%3A%2F%2Ffoobar.jpg&key=xxx'

  describe 'when disabled', ->
    beforeEach ->
      resizer.__set__ 'DISABLE_IMAGE_PROXY', 'true'

    it 'returns the non-proxied URL', ->
      resize('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'
      crop('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'
      fill('http://foobar.jpg', width: 32, height: 32).should.equal 'http://foobar.jpg'

describe 'using the gemini proxy', ->
  before ->
    resizer.__set__ 'GEMINI_CLOUDFRONT_URL', 'https://cat.com'

  describe '#resizeWithGemini', ->
    it 'returns the appropriate URL', ->
      resizeWithGemini(null, resize_to: 'height', height: 32, token: 'percy').
        should.equal 'https://cat.com/?resize_to=height&height=32&token=percy'

  describe 'when disabled', ->
    beforeEach ->
      resizer.__set__ 'DISABLE_GEMINI_PROXY', true
      resizer.__set__ 'EMBEDLY_KEY', 'xxx'
      resizer.__set__ 'DISABLE_IMAGE_PROXY', false

    it 'returns the embedly URL', ->
      resizeWithGemini('http://foobar.jpg', resize_to: 'height', height: 32, token: 'percy').
        should.equal 'https://i.embed.ly/1/display/resize?height=32&quality=95&grow=false&url=http%3A%2F%2Ffoobar.jpg&key=xxx'
