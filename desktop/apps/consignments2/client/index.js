export default () => {
  $('body').on('click', '#consignments2-open-faq-modal', (e) => {
    e.preventDefault()
    $('.consignments2-faq').show()
    $('body').addClass('is-scrolling-disabled')
  })

  $('body').on('click', '.consignments2-faq__close', (e) => {
    e.preventDefault()
    $('.consignments2-faq').hide()
    $('body').removeClass('is-scrolling-disabled')
  })
}
