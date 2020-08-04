/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require("should")
const DateHelpers = require("../date_helpers")

describe("DateHelpers", function () {
  describe("#timespanInWords", () =>
    it("transforms UTC start and end dates into a readable string", function () {
      DateHelpers.timespanInWords(
        "2012-09-07T04:00:00+00:00",
        "2013-01-08T05:00:00+00:00"
      ).should.equal("Sep 7th, 2012 – Jan 8th, 2013")
      DateHelpers.timespanInWords(
        "2012-09-07T04:00:00+00:00",
        "2012-11-08T05:00:00+00:00"
      ).should.equal("Sep 7th – Nov 8th 2012")
      return DateHelpers.timespanInWords(
        "2012-09-01T04:00:00+00:00",
        "2012-09-30T05:00:00+00:00"
      ).should.equal("Sep 1st – 30th 2012")
    }))

  return describe("#formatDate", () =>
    it("transforms a UTC date into a readable string", () =>
      DateHelpers.formatDate("2012-05-07T04:00:00+00:00").should.equal(
        "May 7th"
      )))
})
