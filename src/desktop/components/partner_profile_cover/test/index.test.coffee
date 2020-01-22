_ = require 'underscore'
benv = require 'benv'
Profile = require '../../../models/profile'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

render = (data, done) ->
  benv.render resolve(__dirname, '../template.jade'), data, done

describe 'Template', ->
  beforeEach (done) ->
    @profile = new Profile fabricate 'partner_profile',
      id: 'foobar'
      cover_image: fabricate 'profile_cover_image', image_versions: ['medium250x165'], image_url: ':version'
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  afterEach ->
    benv.teardown()

  describe 'all is well', ->
    beforeEach (done) ->
      render { profile: @profile }, done

    it 'renders the template in the appropriate mode', ->
      $('.partner-profile-cover').data('mode').should.equal 'cover'

  describe 'missing a cover image', ->
    beforeEach (done) ->
      @profile.unset 'cover_image'
      render { profile: @profile }, done

    it 'renders the template in the appropriate mode', ->
      $('.partner-profile-cover').data('mode').should.equal 'fallback'

  describe 'has a non-suitable cover image', ->
    beforeEach (done) ->
      @profile.set cover_image: fabricate 'profile_cover_image'
      render { profile: @profile }, done

    it 'renders the template in the appropriate mode', ->
      $('.partner-profile-cover').data('mode').should.equal 'missing'
      _.isUndefined($('.hoverable-image').attr('style')).should.be.true()

    it 'has the initials to use in a fallback display solution', ->
      $('.hoverable-image').data('initials').should.equal 'GG'
