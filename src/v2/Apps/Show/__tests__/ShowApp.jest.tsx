import React from "react"
import { mount } from "enzyme"
import { ShowApp } from "../ShowApp"

jest.mock("v2/Apps/Show/components/ShowMeta", () => ({
  ShowMetaFragmentContainer: () => null,
}))

jest.mock("v2/Apps/Show/components/ShowInstallShots", () => ({
  ShowInstallShotsFragmentContainer: () => null,
}))

const SHOW_FIXTURE = { name: "Example Show" }

describe("ShowApp", () => {
  const getWrapper = () => {
    return mount(<ShowApp show={SHOW_FIXTURE as any} />)
  }

  it("renders the title", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Show")
  })
})
