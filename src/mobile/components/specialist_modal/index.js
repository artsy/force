/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const { SpecialistView } = require("./client/specialist_view")
const { Representatives } = require("../../collections/representatives")
const { ModalView } = require("../modal/view")

export const openSpecialistModal = function ($el) {
  const collection = new Representatives()
  const specialists_view = new SpecialistView({ collection })
  collection.fetch()
  const modal = new ModalView()
  modal.render()
  $el.append(modal.$el)
  return modal.insertModalContent(specialists_view.$el)
}
