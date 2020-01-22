_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'PartnerShowButtons', ->
  describe 'with valid data', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        window.jQuery = $
        Backbone.$ = $
        PartnerShowButtons = benv.require resolve __dirname, '../show_buttons'
        PartnerShowButtons.__set__ 'FollowProfileButton', @FollowProfileButton = sinon.stub()
        PartnerShowButtons.__set__ 'ShowInquiryModal', @ShowInquiryModal = sinon.stub()
        @view = new PartnerShowButtons el: $('body'), model: new Backbone.Model fabricate 'show'
        done()

    afterEach ->
      benv.teardown()

    describe '#initialize', ->
      it 'creates a follow profile button passsing in options', ->
        @ShowInquiryModal.calledWithNew.should.be.ok()

    describe '#contactGallery', ->
      it 'creates a new show inquiry modal', ->
        @view.contactGallery()
        @ShowInquiryModal.calledWithNew.should.be.ok()

  describe 'with invalid data', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        Backbone.$ = $
        PartnerShowButtons = benv.require resolve __dirname, '../show_buttons'
        PartnerShowButtons.__set__ 'FollowProfileButton', @FollowProfileButton = sinon.stub()
        PartnerShowButtons.__set__ 'ShowInquiryModal', @ShowInquiryModal = sinon.stub()
        @view = new PartnerShowButtons el: $('body'), model: new Backbone.Model fabricate 'show', partner: null
        done()

    afterEach ->
      benv.teardown()

    describe '#initialize', ->
      it 'creates a follow profile button passsing in options', ->
        @ShowInquiryModal.calledWithNew.should.be.ok()

    describe '#contactGallery', ->
      it 'creates a new show inquiry modal', ->
        @view.contactGallery()
        @ShowInquiryModal.calledWithNew.should.be.ok()
