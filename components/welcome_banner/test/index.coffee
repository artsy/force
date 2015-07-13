_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
dealWithWelcomeBanner = require '../index'

describe 'dealWithWelcomeBanner', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    $('body').html '<div id="main-layout-welcome-header" style="height: 55px">Welcome</div>'
    dealWithWelcomeBanner()

  it 'removes the welcome banner (offsetting the scroll position) when a user scrolls past it', ->
    sinon.stub($.fn, 'scrollTop').returns 156
    $('body').hasClass('body-header-fixed').should.be.false()
    $(window).trigger 'scroll'
    $('body').hasClass('body-header-fixed').should.be.true()
    _.last($.fn.scrollTop.args)[0].should.equal 101
    $.fn.scrollTop.restore()
