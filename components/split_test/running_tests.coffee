# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =
  # Set up so we can slowly activate new_homepage_buckets
  # as we are comfortable with the load and performance
  forced_login_inquiry:
    key: 'forced_login_inquiry'
    outcomes:
      default: 100
      force_login: 0
    edge: 'force_login'
    dimension: 'dimension15'

  editorial_cta_banner:
    key: 'editorial_cta_banner'
    outcomes:
      old_modal: 34
      banner: 33
      modal: 33
    dimension: 'dimension16'
