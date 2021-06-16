import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Lightbox } from "../Lightbox"

describe("Lightbox", () => {
  const getWrapper = props =>
    mount(
      <MockBoot>
        <Lightbox {...props} />
      </MockBoot>
    )

  describe("preloading", () => {
    it("preloads the default image", () => {
      const wrapper = getWrapper({ isDefault: true })
      expect(wrapper.find("Link")).toHaveLength(1)
    })

    it("skips preloading the other images", () => {
      const wrapper = getWrapper({ isDefault: false })
      expect(wrapper.find("Link")).toHaveLength(0)
    })
  })
})
