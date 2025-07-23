import { render, screen, fireEvent } from "@testing-library/react"
import "jest-styled-components"
import { FollowButton } from "Components/FollowButton/Button"

describe("FollowButton", () => {
  const getWrapper = _props => {
    return render(<FollowButton {..._props} />)
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
        getWrapper(props)
        expect(screen.getByText("Follow")).toBeInTheDocument()
      })

      it("Reads 'Following' if props.isFollowed", () => {
        props.isFollowed = true
        getWrapper(props)
        expect(screen.getAllByText("Following")).toHaveLength(2)
      })
    })

    it("Calls props.handleFollow onClick", () => {
      getWrapper(props)
      const button = screen.getByRole("button")
      fireEvent.click(button)
      expect(props.handleFollow).toBeCalled()
    })

    it("Sets state.showUnfollow on onMouseEnter", () => {
      getWrapper({ ...props, isFollowed: true })
      const button = screen.getByRole("button")
      expect(screen.queryByText("Unfollow")).not.toBeInTheDocument()
      fireEvent.mouseEnter(button)
      expect(screen.getByText("Unfollow")).toBeInTheDocument()
    })

    it("Sets state.showUnfollow on onMouseLeave", () => {
      getWrapper({ ...props, isFollowed: true })
      const button = screen.getByRole("button")
      fireEvent.mouseEnter(button)
      expect(screen.getByText("Unfollow")).toBeInTheDocument()
      fireEvent.mouseLeave(button)
      expect(screen.queryByText("Unfollow")).not.toBeInTheDocument()
    })
  })
})
