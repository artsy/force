"use strict"
let __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw })
    } else {
      cooked.raw = raw
    }
    return cooked
  }
exports.__esModule = true
let setupTestWrapper_1 = require("DevTools/setupTestWrapper")
let react_relay_1 = require("react-relay")
let GridItem_1 = require("../GridItem")
jest.unmock("react-relay")
describe("GridItem", function () {
  let getWrapper = (0, setupTestWrapper_1.setupTestWrapper)({
    Component: GridItem_1["default"],
    query: (0, react_relay_1.graphql)(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          [
            '\n      query GridItem_Test_Query {\n        artwork(id: "foo") {\n          ...GridItem_artwork\n        }\n      }\n    ',
          ],
          [
            '\n      query GridItem_Test_Query {\n        artwork(id: "foo") {\n          ...GridItem_artwork\n        }\n      }\n    ',
          ]
        ))
    ),
  }).getWrapper
  it("navigates to the standard artwork page when clicked", function () {
    let wrapper = getWrapper(_, { isMyCwollectionArtwork: false })
  })
})
let templateObject_1
