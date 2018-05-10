module.exports = {
  validateAcceptConditions() {
    if (this.$acceptConditions.prop('checked')) {
      this.$checkbox.removeClass('error')
      this.$submit.removeClass('is-disabled')
      return true
    } else {
      this.$checkbox.addClass('error')
      this.$submit.addClass('is-disabled')
      return false
    }
  },
}
