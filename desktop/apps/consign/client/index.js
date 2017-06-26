export default () => {
  $('body').on('click', '#consignments-open-faq-modal', (e) => {
    e.preventDefault()
    $('.consignments-faq').show()
    $('body').addClass('is-scrolling-disabled')
  })

  $('body').on('click', '.consignments-faq__close', (e) => {
    e.preventDefault()
    $('.consignments-faq').hide()
    $('body').removeClass('is-scrolling-disabled')
  })
}
