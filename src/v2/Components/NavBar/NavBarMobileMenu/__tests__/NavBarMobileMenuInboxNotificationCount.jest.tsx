import { mount } from "enzyme"
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
    expect(getWrapper().text()).toContain("2")
  })
})
