import { useSystemContext } from "System/Hooks/useSystemContext"
import "jest-styled-components"
import { graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer } from "Components/FollowButton/FollowArtistButton"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowArtistButton_Test_Query } from "__generated__/FollowArtistButton_Test_Query.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "Components/FollowButton/useFollowButtonTracking"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/Hooks/useSystemContext")
jest.mock("../useFollowButtonTracking")
jest.mock("Components/AuthDialog/useAuthDialog")

const onFollow = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<FollowArtistButton_Test_Query>({
  Component: props => {
    return (
      <FollowArtistButtonFragmentContainer
        me={props.me!}
        artist={props.artist!}
        onFollow={onFollow}
      />
    )
  },
  query: graphql`
    query FollowArtistButton_Test_Query @relay_test_operation {
      me {
        ...FollowArtistButton_me
      }
      artist(id: "example") {
        ...FollowArtistButton_artist
      }
    }
  `,
})

describe("FollowArtistButton", () => {
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
        Artist: () => ({ name: "Example", slug: "example" }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(showAuthDialog).toBeCalledWith({
        analytics: { contextModule: "artistHeader", intent: "followArtist" },
        mode: "SignUp",
        options: {
          afterAuthAction: {
            action: "follow",
            kind: "artist",
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
        Artist: () => ({
          internalID: "example",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(submitMutation).toBeCalledWith({
        variables: {
          input: {
            artistID: "example",
            unfollow: false,
          },
        },
      })
    })

    it("tracks the follow click when following", () => {
      renderWithRelay({
        Artist: () => ({
          isFollowed: false,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(false)
    })

    it("tracks the unfollow click when unfollowing", () => {
      renderWithRelay({
        Artist: () => ({
          isFollowed: true,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(true)
    })

    it("calls the onFollow callback", () => {
      renderWithRelay({
        Artist: () => ({
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
