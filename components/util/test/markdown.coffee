md = require '../markdown'
string = "
  `example`

  Hello *world*.
"

describe 'markdown', ->
  it 'converts the Markdown string to html', ->
    md(string).should.containEql '<p><code>example</code> Hello <em>world</em>.</p>'
