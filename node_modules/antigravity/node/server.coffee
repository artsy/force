#
# Fake gravity express app
#

_ = require 'underscore'
express = require 'express'
fabricate = require './fabricate'
{ spawn } = require 'child_process'
path = require 'path'

gravity = module.exports = express()

gravity.get '/api/v1/artwork/:id', (req, res) ->
  res.send fabricate 'artwork', title: 'Main artwork!'

gravity.get '/api/v1/post/:id', (req, res) ->
  res.send fabricate 'post', title: 'Main post!'

gravity.get '/api/v1/related/posts', (req, res) ->
  res.send [fabricate('post', title: 'Related post!'), fabricate('post')]

gravity.get '/api/v1/related/layer/synthetic/main/artworks', (req, res) ->
  res.send [fabricate('artwork', title: 'Suggested artwork!'), fabricate('artwork')]

gravity.get '/api/v1/related/genes', (req, res) ->
  res.send [fabricate('gene', title: 'Related gene!'), fabricate('gene')]

gravity.get '/api/v1/xapp_token', (req, res) ->
  res.send { xapp_token: 'xapp_foobar', expires_in: 'expires in utc string' }

gravity.get '/unsupported_route', (req, res) ->
  res.send "I'm in ur microgravitiez rendering ur pagez!"

gravity.get '/api/v1/match', (req, res) ->
  res.send [fabricate('artwork', value: 'Skull', model: 'artwork')]

gravity.get '/api/v1/admins/available_representatives', (req, res) ->
  res.send [fabricate('user')]

gravity.get '/api/v1/profile/alessandra', (req, res) ->
  res.send fabricate('profile')

gravity.get '/api/v1/fair/:id', (req, res) ->
  res.send fabricate('fair')

gravity.get '/api/v1/fair/:id/sections', (req, res) ->
  res.send [
    { section: "FOCUS", partner_shows_count: 13 }
    { section: "Pier 92", partner_shows_count: 42 }
  ]

gravity.get '/api/v1/fair/:id/shows', (req, res) ->
  res.send results: [fabricate('show',
    fair: fabricate('fair')
    fair_location: { display: 'Dock 4' }
    artworks: [fabricate('artwork')]
  )]

gravity.get '/api/v1/sets', (req, res) ->
  res.send [fabricate('set')]

gravity.get '/api/v1/set/:id/items', (req, res) ->
  res.send [fabricate('featured_link'), fabricate('featured_link')]

gravity.get '/api/v1/profile/:id', (req, res) ->
  if req.params.id is 'thearmoryshow'
    res.send fabricate 'profile',
      owner_type: 'FairOrganizer'
      owner: { default_fair_id: 'the-armory-show' }
  else if req.params.id is 'gagosian-gallery'
    res.send fabricate 'profile',
      owner_type: 'PartnerGallery'
      owner: fabricate('partner', id: 'gagosian-gallery')
  else if req.params.id is 'lacma'
    res.send fabricate 'profile',
      owner_type: 'PartnerMuseum'
      owner: fabricate('partner', id: 'lacma')
  else
    res.send fabricate('profile', owner_type: 'User')

gravity.get '/api/v1/partner/:id', (req, res) ->
  if req.params.id is 'gagosian-gallery'
    res.send fabricate('partner', {
      id: 'gagosian-gallery'
      default_profile_id: 'gagosian-gallery'
      displayable_shows_count: 2
      profile: fabricate('profile',
        owner_type: 'PartnerGallery'
        owner: fabricate('partner', id: 'gagosian-gallery')
      )
    })
  else if req.params.id is 'lacma'
    res.send fabricate('partner', {
      id: 'lacma'
      default_profile_id: 'lacma'
      displayable_shows_count: 1
      name: 'Los Angeles County Museum Of Art'
      published_not_for_sale_artworks_count: 1
      published_for_sale_artworks_count: 1
      profile: fabricate('profile',
        owner_type: 'PartnerMuseum'
        owner: fabricate('partner', id: 'lacma')
      )
    })
  else
    res.send fabricate('partner')

gravity.get '/api/v1/partner/:id/locations', (req, res) ->
  return res.send [] if req.query.page > 2
  res.send [fabricate('location'), fabricate('location')]

gravity.get '/api/v1/partner/:id/shows', (req, res) ->
  return res.send [] if req.query.page > 2
  res.send [fabricate('show', status: 'closed', featured: true), fabricate('show', status: 'running', featured: false)]

gravity.get '/api/v1/partner/:id/artworks', (req, res) ->
  return res.send [] if req.query.page > 2
  res.send [fabricate('artwork'), fabricate('artwork')]

gravity.get '/api/v1/search/filtered/fair/:id/options', (req, res) ->
  res.send { medium: { Painting: 'painting' } }

gravity.get '/api/v1/profile/alessandra/posts', (req, res) ->
  res.send [fabricate 'post']

gravity.get '/api/v1/page/:id', (req, res) ->
  res.send fabricate 'page', content: 'This *page* is awesome!'

gravity.get '/local/*', (req, res) ->
  res.send 'img.jpg'

gravity.get '/api/v1/artwork/.*/flag', (req, res) ->
  res.send [fabricate 'artwork']

gravity.get '/api/v1/me', (req, res) ->
  res.send [fabricate 'user']

gravity.post '/api/v1/me/unsubscribe*', (req, res) ->
  res.send [fabricate 'user']

gravity.post '/api/v1/me/artwork_inquiry_request', (req, res) ->
  res.send fabricate 'user'

gravity.all '*', (req, res) -> res.send 404, "Not Found."
