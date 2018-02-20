// Confirmed an artist during the consignments flow
analyticsHooks.on('consignment:artist:confirmed', function (data) {
  analytics.track('consignment_artist_confirmed', {
    artist_id: data.artistId
  })
})

// Successfully created a submission in convection
analyticsHooks.on('consignment:submitted', function (data) {
  analytics.track('consignment_submitted', {
    submission_id: data.submissionId
  })
})

// Successfully submitted past the asset uploading step
analyticsHooks.on('consignment:completed', function (data) {
  analytics.track('consignment_asset_uploaded', {
    submission_id: data.submissionId,
    asset_ids: data.assetIds
  })
})

// An error occurred while creating/submitting a consignment
analyticsHooks.on('consignment:submission:error', function (data) {
  analytics.track('consignment_failed_to_submit', {
    error_type: data.type,
    errors: data.errors
  })
})

// Clicked the consign button in the consignments header
$(document).on('click', '.consignments-header .consignments-header__consign-button', function (e) {
  const buttonText = $(e.target).text()
  analytics.track('click', {
    type: 'button',
    label: buttonText,
    flow: 'consignments',
    destination_path: '/consign/submission/choose-artist',
    context_module: 'sell your works'
  })
})

// Clicked the consign button in the "How consignments work" section
$(document).on('click', '.consignments-how-consignments-work .consignments-section__consign-button', function (e) {
  const buttonText = $(e.target).text()
  analytics.track('click', {
    type: 'button',
    label: buttonText,
    flow: 'consignments',
    destination_path: '/consign/submission/choose-artist',
    context_module: 'how consignments work'
  })
})

// Clicked the consign button in the "top sale placements" section
$(document).on('click', '.consignments-top-sales .consignments-section__consign-button', function (e) {
  const buttonText = $(e.target).text()
  analytics.track('click', {
    type: 'button',
    label: buttonText,
    flow: 'consignments',
    destination_path: '/consign/submission/choose-artist',
    context_module: 'top sale placements'
  })
})

// Clicked the consign button in the "top sale placements" section
$(document).on('click', '.consignments-upcoming-sales .consignments-section__consign-button', function (e) {
  const buttonText = $(e.target).text()
  analytics.track('click', {
    type: 'button',
    label: buttonText,
    flow: 'consignments',
    destination_path: '/consign/submission/choose-artist',
    context_module: 'upcoming partner sales'
  })
})

// Clicked the consign button in the "start your submission" section
$(document).on('click', '.consignments-footer .consignments-header__consign-button', function (e) {
  const buttonText = $(e.target).text()
  analytics.track('click', {
    type: 'button',
    label: buttonText,
    flow: 'consignments',
    destination_path: '/consign/submission/choose-artist',
    context_module: 'start your submission'
  })
})
