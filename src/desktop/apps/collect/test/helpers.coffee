sinon = require 'sinon'
Backbone = require 'backbone'
pageTitle = require '../../../components/commercial_filter/page_title.coffee'

describe 'Page title helper', ->
  filters = [
    {
      gene_id: "*",
      medium: "catty-art",
      title: "Catty Art"
    },
    {
      gene_id: "percy",
      medium: "*",
      title: "Art by Percy"
    }
  ]
  it 'returns a specified page title when the filter matches', ->
    query = { gene_id: "percy" }
    title = pageTitle(query, filters)
    title.should.equal 'Art By Percy for Sale'
    query = { medium: "catty-art" }
    title = pageTitle(query, filters)
    title.should.equal 'Catty Art for Sale'

  it 'returns a default page title when the filter doesnt match', ->
    query = { medium: "dog-art" }
    title = pageTitle(query, filters)
    title.should.equal 'Collect | Artsy'