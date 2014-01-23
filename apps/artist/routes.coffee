Artist                 = require '../../models/artist'
FollowArtistCollection = require '../../models/follow_artist_collection'

@index = (req, res) ->
  sort = req.query.sort
  sort = '' unless (new Artist).validSort(sort)
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      res.locals.sd.ARTIST = artist.toJSON()
      res.locals.sd.sortBy = sort
      res.render 'index', artist: artist, sortBy: sort
    error: res.backboneError

@follow = (req, res) ->
  return res.redirect("/artist/#{req.params.id}") unless req.user
  new Artist(id: req.params.id).fetch
    cache  : true
    success: (artist) ->
      res.locals.sd.ARTIST = artist.toJSON()
      followArtistCollection = new FollowArtistCollection
      followArtistCollection.follow req.params.id,
        success: ->
          res.render 'index', artist: artist, sortBy: ''
        error: res.backboneError
    error: res.backboneError
