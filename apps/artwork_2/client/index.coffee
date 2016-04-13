{ CLIENT } = require('sharify').data
metaphysics = require '../../../lib/metaphysics.coffee'

exec = (fn) ->
  try
    fn()
  catch err
    console.error err

query = (queries) -> """
  query artwork($id: String!) {
    artwork(id: $id) {
      #{queries.map(({ name }) -> "... #{name}").join ' '}
    }
  }
  #{queries.map(({ query }) -> query).join "\n"}
"""

init = (components) ->
  metaphysics
    variables: CLIENT
    query: query components.map ({ query }) -> query

  .then (data) ->
    components.map ({ init }) ->
      exec ->
        init data

  .catch (err) ->
    console.error err

module.exports.init = ->
  exec require '../components/actions/index.coffee'
  exec require '../components/auction/index.coffee'
  exec require '../components/artists/index.coffee'
  exec require '../components/banner/index.coffee'
  exec require '../components/collapsed_metadata/index.coffee'
  exec require '../components/images/index.coffee'
  exec require '../components/inquiry/index.coffee'
  exec require '../components/metadata/index.coffee'
  exec require '../components/tabs/index.coffee'

  init [
    require '../components/partner/index.coffee'
    require '../components/artist_artworks/index.coffee'
  ]
