{ resolve } = require 'path'
fs = require 'fs'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
FilterDropdownView = require '../filter_dropdown_view'
PartnerFilterFacet = require '../../filter_facet/partner_filter_facet'
FilterParams = require '../../parameters/filter_params'

describe 'FilterDropdownView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'filter dropdown', ->
    beforeEach (done) ->
      $.fn.typeahead = sinon.stub()
      @params = new Backbone.Model category: 'painting', location: 'location-1', type: 'gallery'
      @aggregations = new Backbone.Model

      @facet = new PartnerFilterFacet
        allItems: [
          { id: 'location-1', name: 'Location 1' }
          { id: 'location-2', name: 'Location 2' }
          { id: 'location-3', name: 'Location 3' }
          { id: 'location-4', name: 'Location 4' }
        ]
        facetName: 'location'
        displayName: 'Locations'
        aggregations: @aggregations

      benv.render resolve(__dirname, '../template.jade'), { facet: @facet, params: @params }, =>
        @dropdown = new FilterDropdownView params: @params, facet: @facet, el: $('.partners-facet-dropdown')
        @$input = @dropdown.$input
        done()

    describe '#initialize', ->
      it 'sets up typeahead', ->
        @$input.typeahead.args[0][1].source.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].name.should.equal 'location'
        @$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].template.should.equal 'custom'
        @$input.typeahead.args[0][1].displayKey.should.equal 'name'

    describe '#selected', ->
      it 'blurs the input', ->
        @$input.focus()
        @dropdown.selected { target: @$input }, { id: 'location-2', name: 'Location 2'} , {}
        @$input.is(":focus").should.be.false()

      it 'updates params to new value', ->
        @dropdown.selected { target: @$input }, { id: 'location-2', name: 'Location 2'} , {}
        @params.attributes.should.deepEqual { category: 'painting', location: 'location-2', type: 'gallery' }

      it 'unsets the param key if the suggestion has no id (the All Items suggestion)', ->
        @dropdown.selected { target: @$input }, @$input, { name: 'All Locations' }, {}
        @params.attributes.should.deepEqual category: 'painting', type: 'gallery'

    describe '#inputFocus', ->
      beforeEach ->
        @stub = sinon.stub()
        @dropdown.typeahead = { input: { trigger: @stub } }
        @$input.attr 'placeholder', 'foo bar'

      it 'updates placeholder for focus', ->
        @dropdown.inputFocus()
        @$input.attr('placeholder').should.equal 'Search Locations'

      it 'triggers immediate display of all results', ->
        @dropdown.inputFocus()
        @stub.args[0].should.deepEqual ['queryChanged', '']

    describe '#inputBlur', ->
      beforeEach ->
        @$input.attr 'placeholder', 'foo bar'

      it 'clears the input', ->
        @dropdown.inputBlur()
        @$input.typeahead.args[1].should.deepEqual ['val', '']
        @$input.attr('placeholder').should.equal 'Location 1'

    describe '#setPlaceholder', ->
      beforeEach ->
          @$input.attr 'placeholder', 'foo bar'

      describe 'no selection', ->
        beforeEach ->
          @params.unset 'location', silent: true

        it 'with focus', ->
          @dropdown.setPlaceholder(true)
          @$input.attr('placeholder').should.equal 'Search Locations'
          @$input.hasClass('no-selection').should.be.true()

        it 'without focus', ->
          @dropdown.setPlaceholder(false)
          @$input.attr('placeholder').should.equal 'All Locations'
          @$input.hasClass('no-selection').should.be.true()

      describe 'with selection', ->
        beforeEach ->
          @params.set location: 'location-2', silent: true

        it 'with focus', ->
          @dropdown.setPlaceholder(true)
          @$input.attr('placeholder').should.equal 'Search Locations'
          @$input.hasClass('no-selection').should.be.false()

        it 'without focus', ->
          @dropdown.setPlaceholder(false)
          @$input.attr('placeholder').should.equal 'Location 2'
          @$input.hasClass('no-selection').should.be.false()

  describe 'search dropdown', ->
    beforeEach (done) ->
      $.fn.typeahead = sinon.stub()
      @params = new Backbone.Model category: 'painting', location: 'location-1', type: 'gallery'
      @aggregations = new Backbone.Model

      @facet = new PartnerFilterFacet
        allItems: [
          { id: 'location-1', name: 'Location 1' }
          { id: 'location-2', name: 'Location 2' }
          { id: 'location-3', name: 'Location 3' }
          { id: 'location-4', name: 'Location 4' }
        ]
        facetName: 'term'
        displayName: 'Name'
        aggregations: @aggregations
        search: true

      benv.render resolve(__dirname, '../template.jade'), { facet: @facet, params: @params }, =>
        @dropdown = new FilterDropdownView params: @params, facet: @facet, el: $('.partners-facet-dropdown')
        @$input = @dropdown.$input
        sinon.stub @dropdown, 'goToProfile'
        done()

    describe '#initialize', ->
      it 'sets up typeahead', ->
        @$input.typeahead.args[0][1].source.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].name.should.equal 'term'
        @$input.typeahead.args[0][1].templates.suggestion.should.be.an.instanceOf Function
        @$input.typeahead.args[0][1].template.should.equal 'custom'
        @$input.typeahead.args[0][1].displayKey.should.equal 'name'

    describe '#selected', ->
      it 'blurs the input', ->
        @$input.focus()
        @dropdown.selected { target: @$input }, { id: 'location-2', name: 'Location 2', profile: {href: 'location-2'}} , {}
        @$input.is(":focus").should.be.false()
      it 'redirects to profile page', ->
        @dropdown.selected { target: @$input }, { id: 'location-2', name: 'Location 2', profile: {href: '/partner-profile-url'}} , {}
        @dropdown.goToProfile.args[0][0].should.equal '/partner-profile-url'
