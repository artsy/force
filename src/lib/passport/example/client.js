const sd = require('sharify').data;

$(function() {
  if (sd.CURRENT_USER) {
    $('body').append("<br><br>your email from the client-side!<br> " + sd.CURRENT_USER.email);
    $('[href*=sign_out]').click(function(e) {
      e.preventDefault();
      $.ajax({
        url: '/users/sign_out',
        type: 'DELETE',
        success() {
          return window.location = '/';
        },
        error(xhr, status, error) {
          return alert(error);
        }
      });
    });
    $('[href*=delete]').click(function(e) {
      if (!confirm("Are you sure?")) { return e.preventDefault(); }
    });
  } else {
    $('#trust button').click(() => $.ajax({
      type: 'POST',
      url: `${sd.ARTSY_URL}/api/v1/me/trust_token`,
      headers: { 'x-access-token': $('#trust input').val().trim()
    },
      error(e) {
        alert('Error!');
        return console.warn(e);
      },
      success({ trust_token }) {
        return window.location = `http://${location.host}?trust_token=${trust_token}`;
      }
    }));
  }
});
