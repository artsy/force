imageUrl = require '../index'

describe 'imageUrl', ->
  it 'returns the correct URL (artwork)', ->
    decodeURIComponent(imageUrl('artwork', 'foobar')).should.containEql '/api/v1/artwork/foobar/default_image.jpg'

  it 'returns the correct URL (show)', ->
    decodeURIComponent(imageUrl('partnershow', 'foobar')).should.containEql '/api/v1/partner_show/foobar/default_image.jpg'
    decodeURIComponent(imageUrl('partner_show', 'foobar')).should.containEql '/api/v1/partner_show/foobar/default_image.jpg'

  it 'returns the correct URL (profile)', ->
    decodeURIComponent(imageUrl('profile', 'foobar')).should.containEql '/api/v1/profile/foobar/image'

  it 'returns the correct URL (artist)', ->
    decodeURIComponent(imageUrl('artist', 'foobar')).should.containEql '/api/v1/artist/foobar/image'
