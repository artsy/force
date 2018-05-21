_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
RecentlyViewedArtworks = rewire '../index'
RecentlyViewedArtworks.__set__ 'Cookies',
  set: sinon.stub()
  get: sinon.stub().returns(JSON.stringify([4,5,6]))

describe 'Recently Viewed Artworks', ->
  describe '#setCookie', ->
    it 'sets the artwork id into the cookie', ->
      RecentlyViewedArtworks.setCookie('catty-artwork')
      cookieArgs = RecentlyViewedArtworks.__get__('Cookies').set.args[0]
      cookieArgs[0].should.equal 'recently-viewed-artworks'
      cookieArgs[1].should.equal '["catty-artwork",4,5,6]'

  describe '#artworkIdsForRail', ->
    it 'returns the cookie value when logged out', ->
      RecentlyViewedArtworks.__set__ 'CurrentUser',
        orNull: () -> null
      RecentlyViewedArtworks.__artworkIdsForTest().then (data) ->
        data.should.eql [4,5,6]

    describe 'when logged in', ->
      beforeEach ->
        RecentlyViewedArtworks.__set__ 'CurrentUser',
          orNull: () -> true

      it 'returns the artwork ids associated with the user', ->
        metaphysicsStub = sinon.stub().returns(
          Promise.resolve(me: recentlyViewedArtworkIds: [1,2,3])
        )
        RecentlyViewedArtworks.__set__ 'metaphysics', metaphysicsStub
        RecentlyViewedArtworks.__artworkIdsForTest().then (data) ->
          data.should.eql [1,2,3]

      it 'returns the cookie value if there are no artworks associated', ->
        metaphysicsStub = sinon.stub().returns(Promise.resolve(me: recentlyViewedArtworkIds: []))
        RecentlyViewedArtworks.__set__ 'metaphysics', metaphysicsStub
        RecentlyViewedArtworks.__artworkIdsForTest().then (data) ->
          data.should.eql [4,5,6]