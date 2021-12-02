import { Breakpoint } from "@artsy/palette"
import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import { Profile, ProfileIcon } from "../ProfileIcon"
import { cloneDeep } from "lodash"

describe("ProfileIcon", () => {
  const mockedProfile = {
    name: "Art",
    icon: {
      desktop: {
        src: "src_1",
        srcSet: "srcSet_1",
        size: 100,
      },
      mobile: {
        src: "src_2",
        srcSet: "srcSet_2",
        size: 60,
      },
      sticky: {
        src: "src_3",
        srcSet: "srcSet_3",
        size: 40,
      },
    },
  }

  const getWrapper = ({
    breakpoint = "sm",
    profile = mockedProfile,
    stuck,
  }: {
    breakpoint?: Breakpoint
    profile?: Profile
    stuck?: boolean
  }) =>
    mount(
      <MockBoot breakpoint={breakpoint}>
        <ProfileIcon profile={profile} stuck={stuck} />
      </MockBoot>
    )

  it("does not render if no icon is passed", () => {
    const wrapper = getWrapper({ profile: { name: "Art" } })
    expect(wrapper.find("BorderBox").length).toBe(0)
  })

  describe("desktop", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({ breakpoint: "lg" })
      const imageWrapper = wrapper.find("BorderBox")
      const image = imageWrapper.find("img")

      expect(imageWrapper.prop("size")).toEqual(102)
      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_1")
      expect(image.prop("srcSet")).toEqual("srcSet_1")
    })
  })

  describe("mobile", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({})
      const imageWrapper = wrapper.find("BorderBox")
      const image = imageWrapper.find("img")

      expect(imageWrapper.prop("size")).toEqual(62)
      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_2")
      expect(image.prop("srcSet")).toEqual("srcSet_2")
    })
  })

  describe("sticky", () => {
    it("renders standart icon if stuck param is true but sticky icon's params are not passed", () => {
      const mockedProfileClone = cloneDeep(mockedProfile) as Profile
      delete mockedProfileClone.icon!.sticky
      const wrapper = getWrapper({
        breakpoint: "lg",
        stuck: true,
        profile: mockedProfileClone,
      })
      const imageWrapper = wrapper.find("BorderBox")
      const image = imageWrapper.find("img")
      expect(imageWrapper.prop("size")).toEqual(102)
      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_1")
      expect(image.prop("srcSet")).toEqual("srcSet_1")
    })

    it("renders sticky icon if stuck param is true and sticky icon's params are passed", () => {
      const wrapper = getWrapper({ breakpoint: "lg", stuck: true })
      const imageWrapper = wrapper.find("BorderBox")
      const image = imageWrapper.find("img")
      expect(imageWrapper.prop("size")).toEqual(42)
      expect(image.prop("alt")).toEqual("Logo of Art")
      expect(image.prop("src")).toEqual("src_3")
      expect(image.prop("srcSet")).toEqual("srcSet_3")
    })
  })
})
