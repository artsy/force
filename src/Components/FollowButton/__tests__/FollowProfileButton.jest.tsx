import { useSystemContext } from "System/Hooks/useSystemContext"
import "jest-styled-components"
import { graphql } from "react-relay"
import { FollowProfileButtonFragmentContainer } from "Components/FollowButton/FollowProfileButton"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowProfileButton_Test_Query } from "__generated__/FollowProfileButton_Test_Query.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "Components/FollowButton/useFollowButtonTracking"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/Hooks/useSystemContext")
jest.mock("../useFollowButtonTracking")
jest.mock("Components/AuthDialog/useAuthDialog")

const onFollow = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<FollowProfileButton_Test_Query>({
  Component: props => {
    return (
      <FollowProfileButtonFragmentContainer
        profile={props.partner!.profile!}
        me={props.me!}
        onFollow={onFollow}
      />
    )
  },
  query: graphql`
    query FollowProfileButton_Test_Query @relay_test_operation {
      me {
        ...FollowProfileButton_me
      }
      partner(id: "example") {
        profile {
          ...FollowProfileButton_profile
        }
      }
    }
  `,
})

describe("FollowProfileButton", () => {
  const submitMutation = jest.fn()
  const trackFollow = jest.fn()

  beforeEach(() => {
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return { submitMutation }
    })
    ;(useFollowButtonTracking as jest.Mock).mockImplementation(() => {
      return { trackFollow }
    })
    ;(useAuthDialog as jest.Mock).mockImplementation(() => {
      return { showAuthDialog: jest.fn() }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("logged out", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return { isLoggedIn: false }
      })
    })

    it("renders correctly", () => {
      renderWithRelay()
      expect(screen.getByText("Follow")).toBeInTheDocument()
    })

    it("opens the auth modal", () => {
      const showAuthDialog = jest.fn()

      ;(useAuthDialog as jest.Mock).mockImplementation(() => {
        return { showAuthDialog }
      })

      renderWithRelay({
        Profile: () => ({ name: "Example", slug: "example" }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(showAuthDialog).toBeCalledWith({
        analytics: {
          contextModule: "partnerHeader",
          intent: "followPartner",
        },
        mode: "SignUp",
        options: {
          afterAuthAction: {
            action: "follow",
            kind: "profile",
            objectId: "example",
          },
          title: expect.any(Function),
        },
      })
    })
  })

  describe("logged in", () => {
    beforeEach(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return { isLoggedIn: true }
      })
    })

    it("calls the follow mutation", () => {
      renderWithRelay({
        Profile: () => ({
          internalID: "example",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(submitMutation).toBeCalledWith({
        variables: {
          input: {
            profileID: "example",
            unfollow: false,
          },
        },
      })
    })

    it("tracks the follow click when following", () => {
      renderWithRelay({
        Profile: () => ({
          isFollowed: false,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(false)
    })

    it("tracks the unfollow click when unfollowing", () => {
      renderWithRelay({
        Profile: () => ({
          isFollowed: true,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(true)
    })

    it("calls the onFollow callback", () => {
      renderWithRelay({
        Profile: () => ({
          isFollowed: true,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onFollow).toBeCalledTimes(1)
      expect(onFollow).toBeCalledWith(false)
    })
  })
})
