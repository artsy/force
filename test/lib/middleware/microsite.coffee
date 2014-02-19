sinon                 = require 'sinon'
micrositeMiddleware   = require '../../../lib/middleware/microsite'

describe 'microsite middleware', ->
  describe 'does not have the microsite context', ->
    beforeEach ->
      @req  = query: {}
      @res  = locals: sd: {}

    it 'leaves the locals alone', ->
      micrositeMiddleware(@req, @res, ->)
      @res.locals.sd.MICROSITE.should.not.be.ok

    it 'leaves the locals alone unless all of the contextual params are present', ->
      @req.query.microsite = '1'
      micrositeMiddleware(@req, @res, ->)
      @res.locals.sd.MICROSITE.should.not.be.ok

      @req.query.fair_id = 'armory-show-2013'
      micrositeMiddleware(@req, @res, ->)
      @res.locals.sd.MICROSITE.should.not.be.ok

      @req.query.profile_id = 'thearmoryshow'
      micrositeMiddleware(@req, @res, ->)
      @res.locals.sd.MICROSITE.should.not.be.ok

      @req.query.fair_name = 'Armory%20Show%202013'
      micrositeMiddleware(@req, @res, ->)
      # Now has all the params
      @res.locals.sd.MICROSITE.should.be.ok


  describe 'has the microsite context', ->
    beforeEach ->
      @req = query:
        microsite: '1'
        fair_id: 'armory-show-2013'
        fair_name: 'Armory%20Show%202013'
        profile_id: 'thearmoryshow'
      @res = locals: sd: {}

    it 'sets up the data for the microsite header template', ->
      micrositeMiddleware(@req, @res, ->)

      # Locals
      (fair = @res.locals.micrositeFair).constructor.name.should.equal 'Fair'
      fair.id.should.equal @req.query.fair_id
      fair.get('name').should.equal @req.query.fair_name
      fair.get('organizer').profile_id.should.equal @req.query.profile_id
      (profile = @res.locals.micrositeProfile).constructor.name.should.equal 'Profile'
      profile.id.should.equal @req.query.profile_id

      # Sharify locals
      sd = @res.locals.sd
      sd.MICROSITE.should.be.ok
      sd.MICROSITE_FAIR.should.eql fair.toJSON()
      sd.MICROSITE_PROFILE.should.eql profile.toJSON()

