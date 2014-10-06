HeroUnit = require '../../models/hero_unit'
{ fabricate } = require 'antigravity'

describe 'HeroUnit', ->

  beforeEach ->
    @heroUnit = new HeroUnit fabricate 'hero_unit'