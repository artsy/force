HeroUnit = require '../../models/hero_unit'
{ fabricate } = require 'antigravity'

describe 'HeroUnit', ->

  beforeEach ->
    @heroUnit = new HeroUnit fabricate 'hero_unit'

  describe '#titleImageUrl', ->

    it 'returns retina first', ->
      @heroUnit.set title_image_url: 'bazbar', title_image_retina_url: 'foobar'
      @heroUnit.titleImageUrl().should.equal 'foobar'

    it 'falls back to normal if no retina', ->
      @heroUnit.set title_image_url: 'bazbar', title_image_retina_url: null
      @heroUnit.titleImageUrl().should.equal 'bazbar'