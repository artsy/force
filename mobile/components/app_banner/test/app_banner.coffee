benv = require 'benv'
rewire = require 'rewire'

describe 'AppBanner', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      @AppBanner = rewire '../app_banner'
      $('body').html (@$content = $('<div id="content"></div>'))
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @appBanner = new @AppBanner @$content

  it 'inserts the app banner before the passed in element', ->
    $('body').html().should.containEql 'Artsy for iPhone™'
    $('.app-banner').siblings().attr('id').should.equal 'content'

  describe '#shouldDisplay', ->
    describe 'has not seen', ->
      beforeEach ->
        @UA = @AppBanner.__get__ 'USER_AGENT'

      afterEach ->
        @AppBanner.__set__ 'USER_AGENT', @UA

      it 'true when iPhone but not Safari (i.e., Chrome on iOS)', ->
        @AppBanner.__set__ 'USER_AGENT', 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en-gb) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3'
        @AppBanner.shouldDisplay().should.be.true()

      it 'false when Eigen', ->
        @AppBanner.__set__ 'USER_AGENT', 'Mozilla/5.0 Artsy-Mobile/3.0.3 Eigen/2016.12.02.09/3.0.3 (iPad; iOS 10.1.1; Scale/2.00) AppleWebKit/601.1.46 (KHTML, like Gecko)'
        @AppBanner.shouldDisplay().should.be.false()

      it 'false when iPhone/Safari, where meta tag supersedes this', ->
        @AppBanner.__set__ 'USER_AGENT', 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
        @AppBanner.shouldDisplay().should.be.false()
