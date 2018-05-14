module.exports = {
  validateAcceptConditions() {
    if (this.$acceptConditions.prop('checked')) {
      this.$conditionsCheckbox.removeClass('error')
      this.$submit.removeClass('is-disabled')
      return true
    } else {
      this.$conditionsCheckbox.addClass('error')
      this.$submit.addClass('is-disabled')
      return false
    }
  },
}
