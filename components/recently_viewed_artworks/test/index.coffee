_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
RecentlyViewedArtworks = rewire '../index'
RecentlyViewedArtworks.__set__ 'Cookies',
  set: sinon.stub()
  get: sinon.stub()

describe 'Recently Viewed Artworks', ->
  describe '#setCookie', ->
    it 'sets the artwork id into the cookie', ->
      RecentlyViewedArtworks.setCookie('catty-artwork')
      cookieArgs = RecentlyViewedArtworks.__get__('Cookies').set.args[0]
      cookieArgs[0].should.equal 'recently-viewed-artworks'
      cookieArgs[1].should.equal '["catty-artwork"]'
