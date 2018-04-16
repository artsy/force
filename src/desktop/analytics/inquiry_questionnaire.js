;(function() {
  'use strict'

  var namespace, track, bind, bindOnce

  namespace = function(name) {
    return 'inquiry_questionnaire:' + name
  }

  track = function() {
    var args
    args = arguments
    args[0] = namespace(' ' + args[0])
    analytics.track.apply(null, args)
  }

  bind = function(name, handler) {
    analyticsHooks.on(namespace(name), handler)
  }

  bindOnce = function(name, handler) {
    analyticsHooks.once(namespace(name), handler)
  }

  // DOM events
  var $document = $(document)

  $document.on('click', '.js-choice', function() {
    var choice = $(this).data('value')
    track('Clicked on how_can_we_help option', {
      choice: choice,
    })
  })

  $document.on('click', '.js-iq-collector-level', function(e) {
    track('Clicked "Yes" or "No" button on commercial_interest', {
      collector_level: e.currentTarget.value,
    })
  })

  $document.on('click', '.js-login-email', function() {
    track('Clicked "Log in"')
  })

  $document.on('click', '.js-forgot-password', function() {
    track('Clicked "Forgot Password?"')
  })

  $document.on('click', '.js-send-inquiry', function() {
    track('Clicked "Send" on inquiry form')
  })

  $document.one('input', '.js-inquiry-message', function(e) {
    track('User changed inquiry message from default')
  })

  $document.on('alert', '.js-inquiry-message', function(e) {
    track('User nudged to change inquiry message from default')
  })

  $document.on('click', '.js-iq-save-skip', function() {
    track('Clicked on "No thanks don’t save my information"')
  })

  // Proxied events
  bind('modal:opened', function(context) {
    track('Opened inquiry flow')
  })

  bind('modal:closed', function(context) {
    track('Closed inquiry flow')
  })

  bind('state:completed', function(context) {
    track('Completed inquiry flow')
  })

  bind('state:aborted', function(context) {
    track('Aborted inquiry flow', {
      current: context.state.current(),
    })
  })

  bind('state:next', function(context) {
    track('State changed to ' + context.state.current())
    track('State change', {
      current: context.state.current(),
    })
  })

  bind('user:change:profession', function(context) {
    track('User set profession', {
      profession: context.user.get('profession'),
    })
  })

  bind('user:change:location', function(context) {
    track('User set location', {
      location: context.user.get('location'),
    })
  })

  bind('user:change:phone', function(context) {
    track('User set phone', {
      phone: context.user.get('phone'),
    })
  })

  bind('user:sync', function(context) {
    track('User data saved')
  })

  bind('collector_profile:sync', function(context) {
    track('CollectorProfile data saved')
  })

  bind('user_interests:add', function(context) {
    var userInterest = context.userInterests.last()
    track('User added an interest in artist', {
      artist_id: userInterest.related().interest.id,
    })
  })

  bind('user_interests:remove', function(context) {
    track('User removed an interest in artist')
  })

  bindOnce('inquiry:sync', function(context) {
    track('Inquiry successfully sent')
  })

  bind('inquiry:error', function(context) {
    track('Problem sending inquiry', context.inquiry.attributes)
  })

  bind('collector_profile:change:affiliated_gallery_ids', function(context) {
    track('Changed collector_profile:affiliated_gallery_ids', {
      ids: context.collectorProfile.get('affiliated_gallery_ids'),
    })
  })

  bind('collector_profile:change:affiliated_auction_house_ids', function(
    context
  ) {
    track('Changed collector_profile:affiliated_auction_house_ids', {
      ids: context.collectorProfile.get('affiliated_auction_house_ids'),
    })
  })

  bind('collector_profile:change:affiliated_fair_ids', function(context) {
    track('Changed collector_profile:affiliated_fair_ids', {
      ids: context.collectorProfile.get('affiliated_fair_ids'),
    })
  })

  bind('collector_profile:change:institutional_affiliations', function(
    context
  ) {
    track('Changed collector_profile:institutional_affiliations', {
      value: context.collectorProfile.get('institutional_affiliations'),
    })
  })

  // Non-namespaced events
  bind('user:login', function(context) {
    analytics.track('Successfully logged in', {
      context: 'inquiry_questionnaire',
    })
  })

  bind('user:signup', function(context) {
    analytics.track('Created account', {
      context: 'inquiry_questionnaire',
    })
  })

  bindOnce('inquiry:sync', function(context) {
    analytics.track('Sent artwork inquiry', {
      artwork_id: context.artwork.get('_id'),
      artwork_slug: context.artwork.id,
      inquiry_id: context.inquiry.id,
    })
  })

  bindOnce('inquiry:show', function(context) {
    analytics.track('Sent show inquiry', {
      label: context.label,
    })
  })

  bindOnce('contact:hover', function(context) {
    analytics.track("Hovered over contact form 'Send' button")
  })

  bindOnce('contact:close-x', function(context) {
    analytics.track("Closed the inquiry form via the '×' button")
  })

  bindOnce('contact:close-back', function(context) {
    analytics.track(
      'Closed the inquiry form by clicking the modal window backdrop'
    )
  })

  bindOnce('contact:submitted', function(context) {
    analytics.track('Contact form submitted', context.attributes)
  })

  bind('inquiry:sent', function(context) {
    track('Sent artwork inquiry', { label: context.label })
    track('Submit confirm inquiry modal', context.attributes)
    track(context.changed + ' default message')
    track('Inquiry: ' + context.version + ' Flow', context.session_id)
  })
})()
