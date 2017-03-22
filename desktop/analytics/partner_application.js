if (location.pathname.match('/gallery-partnerships')) {
  $('.partnerships-nav-link.internal').click(function (e) {
    var section = $(e.currentTarget).attr('data-section')
    analytics.track('Clicked nav link on gallery partnerships',
      {section: section, session_id: sd.SESSION_ID}
    )
  })

  $('.partnerships-nav-apply-link').click(function (e) {
    analytics.track('Clicked nav apply on gallery partnerships',
      {session_id: sd.SESSION_ID}
    )
  })

  $('#mktoForm_1238 .mktoButtonRow').click(function (e) {
    analytics.track('Clicked bottom apply on gallery partnerships',
      {session_id: sd.SESSION_ID}
    )
  })

  $('#mktoForm_1238 .mktoButtonRow').click(function (e) {
     var emails = $("#Email").val();
     var session_id = (typeof session_id === '') ? session_id : sd.SESSION_ID;
     analytics.identify(
       {session_id: sd.SESSION_ID, email: email }
     );
   })
}
