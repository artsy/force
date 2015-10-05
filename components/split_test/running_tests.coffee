# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 0.8
#     new: 0.2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =

  partner_application_copy:
    key: 'partner_application_copy'
    outcomes:
      join: 0.5
      apply: 0.5

  scroll_share_article:
    key: 'scroll_share_article'
    outcomes:
      static_current: 0.16
      static_current_fixed: 0.17
      static_fixed: 0.17
      infinite_current: 0.16
      infinite_current_fixed: 0.17
      infinite_fixed: 0.17

