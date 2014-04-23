cheerio       = require 'cheerio'
fs            = require 'fs'
jade          = require 'jade'
path          = require 'path'
Backbone      = require 'backbone'
{ fabricate } = require 'antigravity'
Profile       = require '../../../models/profile'
sd            = require('sharify').data

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Profile Header template', ->

  beforeEach ->
    @profile = new Profile fabricate 'profile'

  it 'renders the profile display name', ->
    $ = cheerio.load render('template')({ profile: @profile })
    $('.profile-badge-name').text().should.equal @profile.displayName()
    $('.profile-followers').text().should.equal @profile.formatFollowText()
    $('.follow-button').length.should.equal 1

  describe 'user viewing own profile', ->

    beforeEach ->
      sd.CURRENT_USER =
        default_profile_id: @profile.id

    it 'renders the profile display name', ->
      $ = cheerio.load render('template')({ profile: @profile })
      $('.profile-badge-name').text().should.equal @profile.displayName()
      $('.profile-followers').text().should.equal @profile.formatFollowText()
      $('.edit-profile').length.should.equal 1

  describe 'with an icon', ->

    it 'renders the profile icon', ->
      $ = cheerio.load render('template')({ profile: @profile })
      $('.profile-badge-icon').should.have.lengthOf 1
      $('.profile-badge-icon').attr('style').should.include @profile.iconImageUrl()

  describe 'with no icon', ->

    it 'displays initials for partner profiles', ->
      @profile = new Profile fabricate 'partner_profile'
      delete @profile.attributes.icon
      $ = cheerio.load render('template')({ profile: @profile })
      $('.profile-badge-icon').should.have.lengthOf 0
      $('.profile-badge-initials').text().should.equal @profile.defaultIconInitials()

    it 'displays a default profile icon for users', ->
      delete @profile.attributes.icon
      $ = cheerio.load render('template')({ profile: @profile })
      $('.profile-badge-icon').css('background-image').should.include @profile.iconImageUrl()

  describe 'with no profile', ->

    it 'doesnt error witout a profile', ->
      $ = cheerio.load render('template')()
      $('.profile-badge-icon').should.have.lengthOf 0
      $('header.profile-header').should.have.lengthOf 1
