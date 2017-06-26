import * as actions from 'desktop/apps/auction2/actions/filter'
import $ from 'jquery'
import { throttle } from 'underscore'

const THROTTLE_MS = 200

export default function infiniteScroll (dispatch) {
  return throttle(() => {
    const threshold = $(window).height() + $(window).scrollTop()
    const $artworks = $('.auction2-page-artworks')

    const shouldFetch =
      $artworks.height() > 0 &&
      threshold > $artworks.offset().top + $artworks.height()

    if (shouldFetch) {
      dispatch(actions.infiniteScroll())
    }
  }, THROTTLE_MS)
}
