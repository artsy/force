# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 0.8
#     new: 0.2
#   edge: 'new'

module.exports =
  artwork_modal:
    key: 'artwork_modal'
    outcomes:
      modal: 0.5
      modeless: 0.5
    edge: 'modal'
