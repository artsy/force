if (location.pathname.match('/gallery-partnerships')) {

  analytics.page('Gallery Partnerships');

  analytics.trackForm(
    $('#mktoForm_1238')[0],
    '/gallery-partnerships CTA',
    {
      session_id: sd.SESSION_ID,
      user_id: sd.CURRENT_USER && sd.CURRENT_USER.id
    }
  );

  $('.partnerships-nav-link.internal').click(function(e){
    var section = $(e.currentTarget).attr('data-section')
    analytics.track('Clicked nav link on gallery partnerships',
      {section: section, session_id: sd.SESSION_ID}
    )
  })

  $('.partnerships-nav-apply-link').click(function(e){
    analytics.track('Clicked nav apply on gallery partnerships',
      {session_id: sd.SESSION_ID}
    )
  })

  $('#mktoForm_1238 .mktoButtonRow').click(function(e){
    analytics.track('Clicked bottom apply on gallery partnerships',
      {session_id: sd.SESSION_ID}
    )
  })

}
