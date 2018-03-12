_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ artistsWithExhibitions, artistsWithoutExhibitions } = require './artist_fixure.coffee'

describe 'Client', ->

  describe 'collapsed bio', ->
    before (done) ->
      benv.setup =>
        benv.expose
          $: benv.require 'jquery'
          gradient: sinon.stub()
          tabs: sinon.stub()
          sd: { CLIENT:
            artists: artistsWithExhibitions
          }
          done()

    after ->
      benv.teardown()

    beforeEach (done) ->
      @artwork = fabricate('artwork', artists: artistsWithExhibitions)
      benv.render resolve(__dirname, '../index.jade'), {
        artwork: @artwork
        helpers: {
          artists:
            build: sinon.stub().returns ['biography', 'exhibition highlights', 'articles']
            name: sinon.stub()
            groupBy: _.groupBy
            showHelpers:
              date: sinon.stub().returns { year: () -> return 2016 }
              showOrFairLocation: sinon.stub()
              partnerNameAndLocation: sinon.stub()
        }
      }, =>
        @gradient = sinon.stub()
        @client = rewire '../'
        @client.__set__ 'gradient', @gradient

        done()


    afterEach ->
      benv.teardown()

    it 'truncates biography', ->
      @client()
      @gradient.calledOnce

  describe 'expanded bio', ->
    before (done) ->
      benv.setup =>
        benv.expose
          $: benv.require 'jquery'
          gradient: sinon.stub()
          tabs: sinon.stub()
          sd: { CLIENT:
            artists: artistsWithoutExhibitions
          }
          done()

    after ->
      benv.teardown()

    beforeEach (done) ->
      @artwork = fabricate('artwork', artists: artistsWithoutExhibitions)
      benv.render resolve(__dirname, '../index.jade'), {
        artwork: @artwork
        helpers: {
          artists:
            build: sinon.stub().returns ['biography', 'exhibition highlights', 'articles']
            name: sinon.stub()
            groupBy: _.groupBy
            showHelpers:
              date: sinon.stub().returns { year: () -> return 2016 }
              showOrFairLocation: sinon.stub()
              partnerNameAndLocation: sinon.stub()
        }
      }, =>
        @gradient = sinon.stub()
        @client = rewire '../'
        @client.__set__ 'gradient', @gradient

        done()


    afterEach ->
      benv.teardown()

    it 'does not truncate biography', ->
      @client()
      @gradient.callCount.should.equal 0
