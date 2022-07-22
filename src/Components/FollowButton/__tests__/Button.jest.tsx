//
import { mount } from "enzyme"
import "jest-styled-components"
import { FollowButton } from "../Button"

describe("FollowButton", () => {
  const getWrapper = _props => {
    return mount(<FollowButton {..._props} />)
  }

  let props = {
    handleFollow: jest.fn(),
    isFollowed: false,
  }

  describe("unit", () => {
    beforeAll(() => {
      props = {
        handleFollow: jest.fn(),
        isFollowed: false,
      }
    })

    describe("CTA text", () => {
      it("Reads 'follow' if isFollowed is false", () => {
        const component = getWrapper(props)
        expect(component.text()).toMatch("Follow")
      })

      it("Reads 'Following' if props.isFollowed", () => {
        props.isFollowed = true
        const component = getWrapper(props)
        expect(component.text()).toMatch("Following")
      })
    })

    it("Calls props.handleFollow onClick", () => {
      const component = getWrapper(props)
      component.simulate("click")
      expect(props.handleFollow).toBeCalled()
    })

    it("Sets state.showUnfollow on onMouseEnter", () => {
      const component = getWrapper({ ...props, isFollowed: true })
      expect(component.text()).not.toContain("Unfollow")
      component.simulate("mouseEnter")
      expect(component.text()).toContain("Unfollow")
    })

    it("Sets state.showUnfollow on onMouseLeave", () => {
      const component = getWrapper({ ...props, isFollowed: true })
      component.simulate("mouseEnter")
      expect(component.text()).toContain("Unfollow")
      component.simulate("mouseLeave")
      expect(component.text()).not.toContain("Unfollow")
    })
  })
})
