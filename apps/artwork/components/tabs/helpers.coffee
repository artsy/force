# Example:
#
# module.exports =
#   tabs: tabs = [
#     'foo'
#     'bar'
#   ]
#
#   sections: sections = (artwork) ->
#     has: (section) ->
#       switch section
#         when 'foo'
#           artwork.foo? or
#           artwork.whatever?
#         when 'bar'
#           artwork.bar?
#         else
#           false
#
#   build: (artwork) ->
#     tabs.filter (tab) ->
#       sections artwork
#         .has tab
#
#   name: (section) ->
#     section.split '_'
#       .join ' '
