import { mount } from "enzyme"
import { Sans } from "@artsy/palette"
import React from "react"
import { InboxNotificationCount } from "../InboxNotificationCount"

jest.mock("lib/isServer", () => ({
  isServer: false,
}))

jest.mock("cookies-js", () => ({
  get: jest.fn().mockReturnValue(2),
}))

describe("InboxNotificationCount", () => {
  const getWrapper = () => {
    return mount(<InboxNotificationCount />)
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the correct count", () => {
    const inboxNotificationCount = getWrapper().find(Sans).first()
    expect(inboxNotificationCount.text()).toEqual("2")
  })
})
