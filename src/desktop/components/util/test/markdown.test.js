/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const md = require("../markdown")
const string = `\
\`example\` \
\
Hello *world*.\
`

describe("markdown", () =>
  it("converts the Markdown string to html", () =>
    md(string).should.containEql(
      "<p><code>example</code> Hello <em>world</em>.</p>"
    )))
