import { Breakpoint } from "@artsy/palette"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Profile, ProfileIcon } from "../ProfileIcon"

describe("ProfileIcon", () => {
  const mockedProfile = {
    name: "Art",
    icon: {
      desktop: {
        src: "src_1",
        srcSet: "srcSet_1",
      },
      mobile: {
        src: "src_2",
        srcSet: "srcSet_2",
      },
    },
  }

  const getWrapper = ({
    breakpoint = "sm",
    profile = mockedProfile,
  }: {
    breakpoint?: Breakpoint
    profile?: Profile
  }) =>
    mount(
      <MockBoot breakpoint={breakpoint}>
        <ProfileIcon profile={profile} />
      </MockBoot>
    )

  it("does not render if no icon is passed", () => {
    const wrapper = getWrapper({ profile: { name: "Art" } })
    expect(wrapper.find("BorderBox").length).toBe(0)
  })

  describe("desktop", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({ breakpoint: "lg" })
      const image = wrapper.find("BorderBox img")

      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_1")
      expect(image.prop("srcSet")).toEqual("srcSet_1")
      expect(image.prop("width")).toEqual(100)
      expect(image.prop("height")).toEqual(100)
    })
  })

  describe("mobile", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({})
      const image = wrapper.find("BorderBox img")

      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_2")
      expect(image.prop("srcSet")).toEqual("srcSet_2")
      expect(image.prop("width")).toEqual(60)
      expect(image.prop("height")).toEqual(60)
    })
  })
})
