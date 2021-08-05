import { mount } from "enzyme"
import { Sans } from "@artsy/palette"
import React from "react"
import { NavBarMobileMenuInboxNotificationCount } from "../NavBarMobileMenuInboxNotificationCount"

jest.mock("lib/isServer", () => ({
  isServer: false,
}))

jest.mock("cookies-js", () => ({
  get: jest.fn().mockReturnValue(2),
}))

describe("NavBarMobileMenuInboxNotificationCount", () => {
  const getWrapper = () => {
    return mount(<NavBarMobileMenuInboxNotificationCount />)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the correct count", () => {
    const inboxNotificationCount = getWrapper().find(Sans).first()
    expect(inboxNotificationCount.text()).toEqual("2")
  })
})
