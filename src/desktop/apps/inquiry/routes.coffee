{ NODE_ENV, APPLICATION_NAME, API_URL } = require('sharify').data
{ InquiryOutcome } = require '../../models/inquiry_outcome'
{ Artwork } = require '../../models/artwork'
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
      inquiry.set 'user_reported_outcome', req.query.option

    res.locals.sd.INQUIRY = inquiry.toJSON()
    res.render 'user_outcome',
      artwork: inquiry.related().inquireable
      inquiry: inquiry
      options_map:
        'purchased': 'I purchased the work',
        'still_considering': 'I\'m still considering it',
        'high_price': 'The asking price is too high',
        'lost_interest': 'I\'m no longer interested',
        'work_unavailable': 'The work was not available',
        'other': 'Other'
      already_submitted: already_submitted
      views: Object.keys map.views
      NODE_ENV: NODE_ENV
      APPLICATION_NAME: APPLICATION_NAME
      API_URL: API_URL
