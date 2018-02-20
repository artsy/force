path = require 'path'
jade = require 'jade'
fs = require 'fs'

describe 'templates', ->
  render = (template, options) ->
    file = path.resolve __dirname, "../#{template}.jade"
    jade.render fs.readFileSync(file).toString(), options

  describe 'pre-rendered template', ->
    before ->
      facet = facetName: 'some-parameter', displayName: 'Things'
      @el = render 'template', facet: facet

    it 'assigns correct class', ->
      @el.should.containEql "<div class=\"partners-facet-dropdown filter-partners-dropdown dropdown-some-parameter\">"
    it 'assigns initial placeholder', ->
      @el.should.containEql "<input placeholder=\"All Things\" class=\"partners-facet-input no-selection\"/>"
    it 'renders correct search icon', ->
      @el.should.containEql "<span class=\"icon-chevron-down\">"

  describe 'suggestion template', ->

    it 'renders an item with no count specified', ->
      item = name: 'Foo Bar', id: 'some-id'
      el = render 'suggestion', item: item
      el.should.equal "<a class=\"js-partner-filter partner-search-filter-item\">Foo Bar</a>"

    it 'renders an item with a count of zero', ->
      item = name: 'Foo Bar', id: 'some-id', count: 0
      el = render 'suggestion', item: item
      el.should.equal "<a class=\"js-partner-filter partner-search-filter-item is-disabled\">Foo Bar (0)</a>"

    it 'renders an item with a results count', ->
      item = name: 'Foo Bar', id: 'some-id', count: 1
      el = render 'suggestion', item: item
      el.should.equal "<a class=\"js-partner-filter partner-search-filter-item\">Foo Bar (1)</a>"
  
  describe 'search facet', ->
    before ->
      facet = facetName: 'some-parameter', displayName: 'Things', search: true
      @el = render 'template', facet: facet

    it 'assigns correct class', ->
      @el.should.containEql "<div class=\"partners-facet-dropdown filter-partners-dropdown dropdown-some-parameter\">"
    it 'assigns initial placeholder', ->
      @el.should.containEql "<input placeholder=\"All Things\" class=\"partners-facet-input no-selection\"/>"
    it 'renders correct search icon', ->
      @el.should.containEql "<span class=\"icon-search\">"
