_ = require 'underscore'
should = require 'should'
Backbone = require 'backbone'
FairLocation = require '../../models/partner_location'

describe 'FairLocation', ->

  beforeEach ->
    @location = new FairLocation(
      id: "5227735c8b3b8125fd000368",
      raw: null,
      city: "255 Front Street West, Toronto",
      display: "255 Front Street West, Toronto",
      address: "",
      address_2: "",
      state: "",
      state_code: "",
      postal_code: "",
      coordinates: null,
      timezone: null,
      summary: "\nMetro Toronto Convention Centre   \n255 Front Street West, Toronto\n\n\n**Opening Night Preview**  \nA benefit for the Art Gallery of Ontario  \nThursday, October 24, 2013 \n\n\n**Public Hours**  \nOctober 25 - October 28, 2013"
    )

  describe '#singleLine', ->

    it 'returns the display field', ->
      @location.singleLine().should.equal @location.get('display')
