import React from "react"
import { mount } from "enzyme"
import { EditButton } from "../EditButton"

jest.mock("sharify", () => ({
  data: {
    CURRENT_USER: { id: "567" },
    POSITRON_URL: "https://writer.artsy.net",
  },
}))
const sd = require("sharify").data

jest.mock("desktop/lib/positronql", () => ({
  positronql: jest.fn(),
}))
const mockPositronql = require("desktop/lib/positronql").positronql as jest.Mock

describe("EditButton", () => {
  let props
  const getWrapper = () => {
    return mount(<EditButton {...props} />)
  }

  beforeEach(() => {
    props = {
      slug: "artsy-editorial-slug",
      channelId: "123",
    }
    mockPositronql.mockReset()
  })

  it("renders edit button if the user is a member of the article's channel", async () => {
    const data = { channels: [{ id: "123" }, { id: "234" }] }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    await component.instance().componentDidMount()

    expect(component.html()).toMatch(
      "https://writer.artsy.net/articles/artsy-editorial-slug/edit"
    )
    expect(component.html()).toMatch("icon-with-black-circle")
    expect(component.state()).toEqual({
      hasButtonState: true,
      showEditButton: true,
    })
  })

  it("does not render edit button if the user is not a member of the article's channel", async () => {
    const data = { channels: [{ id: "234" }] }
    mockPositronql.mockReturnValue(Promise.resolve(data))
    const component = getWrapper()
    await component.instance().componentDidMount()

    expect(component.children().length).toBe(0)
    expect(component.html()).toBe(null)
    expect(component.state()).toEqual({
      hasButtonState: true,
      showEditButton: false,
    })
  })

  it("does not render edit button if there is no user", () => {
    delete sd.CURRENT_USER
    const component = getWrapper()
    component.instance().componentDidMount()

    expect(mockPositronql).not.toBeCalled()
    expect(component.children().length).toBe(0)
    expect(component.html()).toBe(null)
    expect(component.state()).toEqual({
      hasButtonState: true,
      showEditButton: false,
    })
  })
})
