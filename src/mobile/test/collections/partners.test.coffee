Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Partners = require '../../collections/partners'

describe 'Articles', ->

  beforeEach ->
    @partners = new Partners [fabricate 'post']

# FIXME: No tests!
