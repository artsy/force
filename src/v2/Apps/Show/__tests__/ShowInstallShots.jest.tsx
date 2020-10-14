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
      mobile: { width: 449, height: 300 },
      desktop: {
        src: "0_example1x.jpg",
        srcSet: "0_example1x.jpg",
        width: 599,
        height: 400,
      },
      zoom: {
        src: "0_zoomExample1x.jpg",
        srcSet: "0_zoomExample1x.jpg",
        width: 900,
        height: 600,
      },
    },
    {
      internalID: "example-image-1",
      mobile: { width: 449, height: 300 },
      desktop: {
        src: "1_example1x.jpg",
        srcSet: "1_example1x.jpg",
        width: 599,
        height: 400,
      },
      zoom: {
        src: "1_zoomExample1x.jpg",
        srcSet: "1_zoomExample1x.jpg",
        width: 900,
        height: 600,
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
