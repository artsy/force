_               = require 'underscore'
sd              = require('sharify').data
{ fabricate }   = require 'antigravity'
Backbone        = require 'backbone'
AdditionalImage = require '../../models/additional_image'

describe 'AdditionalImage', ->

  beforeEach ->
    @model = new AdditionalImage fabricate('show_install_shot')
