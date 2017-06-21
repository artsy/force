import $ from 'jquery'

const DURATION = 400

export default function scrollToTop () {
  const scrollTop = $('.auction-artworks-header').offset().top - $('.mlh-navbar').height()
  $('html,body').animate({ scrollTop }, DURATION)
}
