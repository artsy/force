{ extend } = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'

dispatch = rewire '../services/index'
embedly = rewire '../services/embedly'
embedly.__set__ 'resizer', dispatch
gemini = rewire '../services/gemini'
gemini.__set__ 'resizer', dispatch

resizer = rewire '../index'
resizer.__set__ 'SERVICES', EMBEDLY: embedly, GEMINI: gemini

describe 'resizer', ->
  before ->
    @src = 'https://d32dm0rphc51dk.cloudfront.net/RhCPuRWITO6WFW2Zu_u3EQ/large.jpg'

  describe 'using the embedly proxy', ->
    before ->
      embedly.__set__ 'EMBEDLY_KEY', 'xxx'

      @config = resizer.__get__ 'config'
      resizer.__set__ 'config', extend {}, @config, proxy: 'EMBEDLY'

    after ->
      resizer.__set__ 'config', @config

    describe '#resize', ->
      it 'returns the appropriate URL', ->
        resizer.resize @src, width: 32, height: 32
          .should.equal 'https://i.embed.ly/1/display/resize?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80&key=xxx'

      it 'supports options', ->
        resizer.resize @src, width: 300, height: 200, quality: 50
          .should.equal 'https://i.embed.ly/1/display/resize?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=50&key=xxx'

      it 'falls back when it has invalid options', ->
        resizer.resize @src, width: 0, height: 100
          .should.equal @src

    describe '#crop', ->
      it 'returns the appropriate URL', ->
        resizer.crop @src, width: 32, height: 32
          .should.equal 'https://i.embed.ly/1/display/crop?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80&key=xxx'

      it 'supports options', ->
        resizer.crop @src, width: 300, height: 200, quality: 50
          .should.equal 'https://i.embed.ly/1/display/crop?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=50&key=xxx'

      it 'falls back when it has invalid options', ->
        resizer.crop @src, width: 0, height: 100
          .should.equal @src

    describe '#fill', ->
      it 'returns the appropriate URL', ->
        resizer.fill @src, width: 32, height: 32
          .should.equal 'https://i.embed.ly/1/display/fill?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&color=fff&quality=80&key=xxx'

      it 'supports options', ->
        resizer.fill @src, width: 300, height: 200, quality: 50, color: 'ff00cc'
          .should.equal 'https://i.embed.ly/1/display/fill?url=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&color=ff00cc&quality=50&key=xxx'

      it 'falls back when it has invalid options', ->
        resizer.fill @src, width: 0, height: 100
          .should.equal @src

    describe 'when disabled', ->
      beforeEach ->
        dispatch.__set__ 'enabled', false

      afterEach ->
        dispatch.__set__ 'enabled', true

      it 'returns the non-proxied URL', ->
        resizer.resize @src, width: 32, height: 32
          .should.equal @src
        resizer.crop @src, width: 32, height: 32
          .should.equal @src
        resizer.fill @src, width: 32, height: 32
          .should.equal @src

  describe 'using the gemini proxy', ->
    before ->
      gemini.endpoint = 'https://d7hftxdivxxvm.cloudfront.net'

      @config = resizer.__get__ 'config'
      resizer.__set__ 'config', extend {}, @config, proxy: 'GEMINI'

    after ->
      resizer.__set__ 'config', @config

    describe '#resize', ->
      it 'returns the appropriate URL when no width is specified', ->
        resizer.resize @src, height: 300
          .should.equal 'https://d7hftxdivxxvm.cloudfront.net?resize_to=height&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&height=300&quality=80'

      it 'returns the appropriate URL when no height is specified', ->
        resizer.resize @src, width: 300
          .should.equal 'https://d7hftxdivxxvm.cloudfront.net?resize_to=width&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&quality=80'

      it 'returns the appropriate URL when both a height and width are specified', ->
        resizer.resize @src, width: 300, height: 200
          .should.equal 'https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=300&height=200&quality=80'

    describe '#crop', ->
      it 'returns the appropriate URL', ->
        resizer.crop @src, width: 32, height: 32
          .should.equal 'https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80'

    describe '#fill', ->
      it 'is not really supported and falls back to crop', ->
        resizer.fill @src, width: 32, height: 32
          .should.equal 'https://d7hftxdivxxvm.cloudfront.net?resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FRhCPuRWITO6WFW2Zu_u3EQ%2Flarge.jpg&width=32&height=32&quality=80'
