/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const InquiryOutcomeRelations = {
  related() {
    const { Artwork } = require("../../artwork")

    const inquireable =
      this.get("inquireable_type") === "Artwork"
        ? new Artwork(this.get("inquireable"))
        : undefined

    return (this.__related__ = { inquireable })
  },
}
