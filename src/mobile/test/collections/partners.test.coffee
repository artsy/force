Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Partners = require '../../collections/partners'

describe 'Articles', ->

  beforeEach ->
    @partners = new Partners [fabricate 'post']
