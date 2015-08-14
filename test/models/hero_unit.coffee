_ = require 'underscore'
{ fabricate } = require 'antigravity'
HeroUnit = require '../../models/hero_unit'
{ Image } = require 'artsy-backbone-mixins'
_.extend HeroUnit::, Image('https://secure.foo.bar')

describe 'HeroUnit', ->
  beforeEach ->
    @heroUnit = new HeroUnit fabricate 'hero_unit'

  it 'should guard against null values (returning undefined)', ->
    _.isUndefined(@heroUnit.backgroundImageUrl()).should.be.ok()

  it 'should return the value if not null', ->
    @heroUnit.set 'background_image_url', 'http://static1.artsy.net/existy.jpg'
    @heroUnit.backgroundImageUrl().should.equal 'https://secure.foo.bar/existy.jpg'
    @heroUnit.set 'background_image_url', 'existy.jpg'
    @heroUnit.backgroundImageUrl().should.equal 'existy.jpg'
