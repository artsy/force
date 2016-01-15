metaphysics = require '../../lib/metaphysics'

query = """
  query artwork($id: String!) {
    artwork(id: $id) {
      ... banner
      ... images
      ... metadata
    }
  }
  #{require './components/banner/query'}
  #{require './components/images/query'}
  #{require './components/metadata/query'}
"""

@index = (req, res, next) ->
  metaphysics
    variables: id: req.params.id
    query: query

  .then (data) ->
    if req.query.query?
      res.send query
    else if req.query.data?
      res.send data
    else
      res.render 'index', data

  .catch next
