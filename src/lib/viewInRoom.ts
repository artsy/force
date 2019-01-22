const { ViewInRoomView } = require('../desktop/components/view_in_room/view.coffee')

// Enable the "view in room" function on artworks with is_hangable === true
export function openViewInRoom({ dimensions, image }) {

    // Navigate back to default image if needed
    // $('.js-artwork-images__pages__page')
    //   .first()
    //   .click()

    const view = new ViewInRoomView
      $img: image
      dimensions: dimensions

    $('body').prepend view.render().$el
}
