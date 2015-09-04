benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
mediator = require '../../../lib/mediator.coffee'
ShareView = require '../view.coffee'
{ resolve } = require 'path'

describe 'ShareView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      window.open = sinon.stub()
      @view = new ShareView el: $("""
        <div>
          <a href='#share' data-service='okcupid'></a>
        </div>
      """)
      done()

  after ->
    benv.teardown()

  describe '#initialize', ->
    xit '#', ->
      @view.$('a').first().click()
      @openSpy = window.open
      @openSpy.called.should.be.ok()
      @openSpy.args[0][0].should.equal '#share'
      @openSpy.args[0][1].should.equal 'okcupid'
      @openSpy.args[0][2].should.equal 'status=1,width=750,height=400,top=0,left=0'
