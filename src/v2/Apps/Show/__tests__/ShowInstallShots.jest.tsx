import React from "react"
import { mount } from "enzyme"
import { ShowInstallShots } from "../Components/ShowInstallShots"

jest.mock("v2/Components/Carousel", () => ({
  Carousel: ({ children }) => children,
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalBase: ({ children }) => children,
  }
})

const SHOW_FIXTURE = {
  name: "Example Show",
  images: [
    {
      internalID: "example-image-0",
      mobile1x: { width: 449, height: 300 },
      _1x: {
        src: "0_example1x.jpg",
        width: 599,
        height: 400,
      },
      _2x: {
        src: "0_example2X.jpg",
      },
      zoom1x: {
        src: "0_zoomExample1x.jpg",
        width: 900,
        height: 600,
      },
      zoom2x: {
        src: "0_zoomExample2X.jpg",
      },
    },
    {
      internalID: "example-image-1",
      mobile1x: { width: 449, height: 300 },
      _1x: {
        src: "1_example1x.jpg",
        width: 599,
        height: 400,
      },
      _2x: {
        src: "1_example2X.jpg",
      },
      zoom1x: {
        src: "1_zoomExample1x.jpg",
        width: 900,
        height: 600,
      },
      zoom2x: {
        src: "1_zoomExample2X.jpg",
      },
    },
  ],
}

describe("ShowInstallShots", () => {
  const getWrapper = (data = SHOW_FIXTURE) => {
    return mount(<ShowInstallShots show={data as any} />)
  }

  it("renders null if there are no images", () => {
    const wrapper = getWrapper({ ...SHOW_FIXTURE, images: [] })
    expect(wrapper.html()).toBeNull()
  })

  it("renders the images", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("button")).toHaveLength(2)
    expect(wrapper.find("img")).toHaveLength(2)
  })

  it("zooms the second image when it is clicked", () => {
    const wrapper = getWrapper()
    expect(wrapper.html()).not.toContain("1_zoomExample1x.jpg")
    wrapper.find("button").at(1).simulate("click")
    expect(wrapper.html()).toContain("1_zoomExample1x.jpg")
  })
})
