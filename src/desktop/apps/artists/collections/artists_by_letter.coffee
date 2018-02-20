_ = require 'underscore'
sd = require('sharify').data
Artist = require '../../../models/artist.coffee'
PageableCollection = require '../../../components/pageable_collection/index.coffee'

module.exports = class ArtistsByLetter extends PageableCollection
  url: ->
    "#{sd.API_URL}/api/v1/artists/#{@letter}?total_count=1"

  model: Artist

  range: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  state: pageSize: 100

  initialize: (models, options={}) ->
    { @letter } = options

    throw new Error('Out of range') unless _.contains(@range, @letter)

    super
