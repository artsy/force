{ NODE_ENV, APPLICATION_NAME, API_URL } = require('sharify').data
InquiryOutcome = require '../../models/inquiry_outcome'
Artwork = require '../../models/artwork'
map = require '../../components/inquiry_questionnaire/map'

@index = (req, res) ->
  artwork = new Artwork id: req.params.artwork_id
  artwork.fetch cache: true, error: res.backboneError, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()
    res.render 'index', artwork: artwork

@development = (req, res) ->
  artwork = new Artwork id: req.query.artwork_id or
    'cindy-sherman-untitled'

  artwork.fetch cache: true, error: res.backboneError, success: ->
    res.locals.sd.ARTWORK = artwork.toJSON()

    res.render 'development',
      artwork: artwork
      views: Object.keys map.views
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
      HAS_SEEN: req.cookies['inquiry-questionnaire-log']

@user_outcome = (req, res) ->
  inquiry = new InquiryOutcome
    id: req.params.id
    outcome_token: req.query.outcome_token

  inquiry.fetch data: { outcome_token: inquiry.get('outcome_token') }, cache: false, error: res.backboneError, success: ->
    already_submitted = if inquiry.get('user_reported_outcome') then true else false
    if not already_submitted
      # We have changed possible selected options value coming in from email
      # so new emails will all have correct options
      # but for a while we have to support old values that were in already sent out emails
      # following 8 lines can be removed in a separate PR after a week from when we went live
      # This logic basically translate old values to their new ones
      legacy_options_map =
        'I purchased the work': 'PURCHASED',
        'I\'m still considering the work': 'STILL_CONSIDERING',
        'The asking price is too high': 'HIGH_PRICE',
        'I\'m no longer interested in this work': 'LOST_INTEREST',
        'The work was not available': 'WORK_UNAVAILABLE'
      if req.query.option of legacy_options_map
        req.query.option = legacy_options_map[req.query.option]
      inquiry.set 'user_reported_outcome', req.query.option

    res.locals.sd.INQUIRY = inquiry.toJSON()
    res.render 'user_outcome',
      artwork: inquiry.related().inquireable
      inquiry: inquiry
      options_map:
        'PURCHASED': 'I purchased the work',
        'STILL_CONSIDERING': 'I\'m still considering it',
        'HIGH_PRICE': 'The asking price is too high',
        'LOST_INTEREST': 'I\'m no longer interested',
        'WORK_UNAVAILABLE': 'The work was not available',
        'OTHER': 'Other'
      already_submitted: already_submitted
      views: Object.keys map.views
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
