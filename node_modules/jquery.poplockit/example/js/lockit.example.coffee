# PopLockIt.js example code
#
# Generates html to demonstrate what popLockIt.js does
# creates 'feedItems' that consist of columns of placekittens
# each of these columns will 'pop' and 'lock' in place as the user scrolls
#
# @requires jQuery
# @requires popLockIt.js

App = 
  defaults:
    numberItems: 20
    numberColumns: 6
    kittenHeight: 400
    columnPadding: 20

  initialize: ->
    @columnWidth = @getColumnWidth()

    $('body')
      .html("<div class='container'>#{@generateFeedHtml()}</div>")
      .find('.container')
      .popLockIt
        feedItems      : $('body .container > ul')
        columnSelector : '> ul'

  getColumnWidth: -> Math.floor($('body').width() / @defaults.numberColumns / 10) * 10 - 40

  generateFeedHtml: ->
    [1..@defaults.numberItems].map =>
      "<ul>" + [1..@defaults.numberColumns].map =>
        @generateKittensHtml Math.ceil(1 + (Math.random() * 6))
      .join('') + "</ul>"
    .join('')


  generateKittensHtml: (num) ->
    "<ul style='width: #{@columnWidth}px'>" + [1..num].map =>
      height = Math.ceil((50 + (Math.random() * 300))/ 10) * 10
      width = @columnWidth - @defaults.columnPadding
      "<li style='width: #{width}px'><img height='#{height}' width='#{width}' src='http://placekitten.com/#{width}/#{height}'></li>"
    .join('') + "</ul>"

$ -> App.initialize()
