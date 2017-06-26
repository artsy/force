import $ from 'jquery'

const DURATION_MS = 400

export default function scrollToTop () {
  const scrollTop = $('.auction2-artworks-header').offset().top - $('.mlh-navbar').height()
  $('html,body').animate({ scrollTop }, DURATION_MS)
}
