import Backbone from "backbone"
import $ from "jquery"
import { fabricate } from "@artsy/antigravity"
import { logoutEventHandler } from "desktop/lib/global_client_setup"

const CurrentUser = require("../../../models/current_user")
const { UserSettingsView } = require("../client/view.coffee")
jest.mock("desktop/lib/global_client_setup", () => ({
  logoutEventHandler: jest.fn(),
}))

describe("UserSettingsView", () => {
  let view
  beforeEach(() => {
    Backbone.sync = jest.fn()
    new CurrentUser(fabricate("user"))
    view = new UserSettingsView({
      el: $(
        `<div id='settings'> \
          <div id='#settings-generic-error'></div> \
          <div class='js--settings-logout'></div> \
          </div>`
      ),
    })
  })

  describe("#logout", () => {
    it("logs out a user who was signed in", () => {
      view.$(".js--settings-logout").click()
      expect(logoutEventHandler).toBeCalled()
    })
  })
})
