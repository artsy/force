artworks = require './fixture.json'
masonry = require '../index'

sumHeights = (columns) ->
  columns.map (column) ->
    column.reduce (memo, { image }) ->
      memo + image.thumb.height
    , 0

describe 'masonry', ->
  before ->
    { @columns } = masonry artworks

  it 'lays out the artworks into 3 columns', ->
    @columns.should.have.lengthOf 3

  it 'lays them out in a compact manner', ->
    @columns.map (column) -> column.length
      .should.eql [1, 2, 3]

    sumHeights @columns
      .should.eql [308, 486, 511]

  it 'deals with images that dont have a processed geometry by excluding them', ->
    { columns } = masonry artworks.concat [{ image: thumb: height: null }]

    columns.map (column) -> column.length
      .should.eql [1, 2, 3]

    sumHeights columns
      .should.eql [308, 486, 511]
