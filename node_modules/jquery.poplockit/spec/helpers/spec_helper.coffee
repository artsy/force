beforeEach ->
  # Add a div to hold html elements
  $("<div id='test-container'><div class='feeditem'><div class='column'></div><div class='column'></div></div></div>").appendTo('body')
  window.$el = $('#test-container')

afterEach ->
  $('#test_container').remove()
