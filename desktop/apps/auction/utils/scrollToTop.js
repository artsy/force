import $ from 'jquery'

const DURATION_MS = 400

export default function scrollToTop () {
  const scrollTop = $('.auction-artworks-HeaderDesktop').offset().top - $('.mlh-navbar').height()
  $('html,body').animate({ scrollTop }, DURATION_MS)
}
