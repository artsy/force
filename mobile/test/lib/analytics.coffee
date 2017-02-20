rewire = require 'rewire'
rewiredAnalytics = rewire '../../lib/analytics'
Artwork = require '../../models/artwork'
analytics = require '../../lib/analytics'
sinon = require 'sinon'
benv = require 'benv'
sd = require('sharify').data

describe 'analytics', ->

  describe 'with a standard useragent', ->
    beforeEach ->
      sd.MIXPANEL_ID = 'mix that panel'
      sd.GOOGLE_ANALYTICS_ID = 'goog that analytics'
      @mixpanelStub = {}
      @mixpanelStub.track = sinon.stub()
      @mixpanelStub.register = sinon.stub()
      @mixpanelStub.init = sinon.stub()
      @gaStub = sinon.stub()

      analytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }

    describe 'initialize function', ->

      it 'initializes mixpanel with the MIXPANEL_ID', ->
        @mixpanelStub.init.args[0][0].should.equal 'mix that panel'

      it 'inits ga with the GOOGLE_ANALYTICS_ID', ->
        @gaStub.args[0][0].should.equal 'create'
        @gaStub.args[0][1].should.equal 'goog that analytics'

    describe '#trackPageview', ->

      it 'sends a google pageview', ->
        analytics.trackPageview()
        @gaStub.args[1][0].should.equal 'send'
        @gaStub.args[1][1].should.equal 'pageview'

      it 'doesnt let failed analytics mess up js code', ->
        analytics mixpanel: null, ga: null, location: { pathname: 'foobar' }
        analytics.trackPageview()

    describe '#modelToLabel', ->

      it 'requires a backbone model', ->
        model = new Artwork(id: '123')
        analytics.modelToLabel(model).should.equal 'Artwork:123'

      it 'errors if a string is passed in', ->
        (()-> analytics.modelToLabel('model')).should.throw()

    describe '#modelNameAndIdToLabel', ->

      it 'capitalizes modelname', ->
        analytics.modelNameAndIdToLabel('modelname', 123).should.equal 'Modelname:123'

      it 'errors without modelName or id', ->
        (()-> analytics.modelNameAndIdToLabel()).should.throw()

    context 'with rewiredAnalytics', ->

      beforeEach (done) ->
        benv.setup =>
          benv.expose
            ga: @gaStub
            mixpanel: @mixpanelStub

          rewiredAnalytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }
          done()

      afterEach ->
        benv.teardown()

      describe '#track', ->

        it 'Does not track admins', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = { type: 'Admin' }
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 2


        it 'Tracks normal users', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = { type: 'User' }
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 3

        it 'Tracks logged out users', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = null
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 3

      describe '#registerCurrentUser', ->

        it 'Does not track admins', ->
          sd.CURRENT_USER = { type: 'Admin' }
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 0

        it 'Tracks normal users', ->
          sd.CURRENT_USER = { type: 'User', id: 'catty' }
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 1
          @mixpanelStub.register.args[0][0]['User Type'].should.equal 'Logged In'

        it 'Tracks logged out users', ->
          sd.CURRENT_USER = null
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 1
          @mixpanelStub.register.args[0][0]['User Type'].should.equal 'Logged Out'
