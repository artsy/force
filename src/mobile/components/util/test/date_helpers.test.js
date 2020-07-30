/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const should = require("should")
const DateHelpers = require("../date_helpers")

describe("DateHelpers", function () {
  describe("#timespanInWords", function () {
    it("transforms UTC start and end dates into a readable string", function () {
      DateHelpers.timespanInWords(
        "2012-09-07T04:00:00+00:00",
        "2013-01-08T05:00:00+00:00"
      ).should.equal("Sep. 7th, 2012 – Jan. 8th, 2013")
      DateHelpers.timespanInWords(
        "2012-09-07T04:00:00+00:00",
        "2012-11-08T05:00:00+00:00"
      ).should.equal("Sep. 7th – Nov. 8th 2012")
      return DateHelpers.timespanInWords(
        "2012-09-01T04:00:00+00:00",
        "2012-09-30T05:00:00+00:00"
      ).should.equal("Sep. 1st – 30th 2012")
    })

    return it("does not add a period to the month of May", function () {
      DateHelpers.timespanInWords(
        "2013-05-01T04:00:00+00:00",
        "2013-07-30T05:00:00+00:00"
      ).should.equal("May 1st – Jul. 30th 2013")
      DateHelpers.timespanInWords(
        "2013-03-01T04:00:00+00:00",
        "2013-05-30T05:00:00+00:00"
      ).should.equal("Mar. 1st – May 30th 2013")
      return DateHelpers.timespanInWords(
        "2013-05-01T04:00:00+00:00",
        "2013-05-30T05:00:00+00:00"
      ).should.equal("May 1st – 30th 2013")
    })
  })

  return describe("#formatDate", function () {
    it("transforms a UTC date into a readable string", () =>
      DateHelpers.formatDate("2012-05-07T04:00:00+00:00").should.equal(
        "May 7th"
      ))

    return it("does not add a period to the month of May", function () {
      DateHelpers.formatDate("2012-09-07T04:00:00+00:00").should.equal(
        "Sep. 7th"
      )
      return DateHelpers.formatDate("2012-11-08T05:00:00+00:00").should.equal(
        "Nov. 8th"
      )
    })
  })
})
