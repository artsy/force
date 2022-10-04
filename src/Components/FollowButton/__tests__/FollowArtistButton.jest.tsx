import { useSystemContext } from "System/useSystemContext"
import "jest-styled-components"
import { graphql } from "react-relay"
import { FollowArtistButtonFragmentContainer } from "Components/FollowButton/FollowArtistButton"
import * as openAuthModal from "Utils/openAuthModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowArtistButton_Test_Query } from "__generated__/FollowArtistButton_Test_Query.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "Components/FollowButton/useFollowButtonTracking"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.mock("../useFollowButtonTracking")

const onFollow = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<FollowArtistButton_Test_Query>({
  Component: props => {
    return (
      <FollowArtistButtonFragmentContainer
        artist={props.artist!}
        onFollow={onFollow}
      />
    )
  },
  query: graphql`
    query FollowArtistButton_Test_Query @relay_test_operation {
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

    // FIXME: SWC_COMPILER_MIGRATION
    it.skip("opens the auth modal", () => {
      const openAuthToSatisfyIntent = jest.spyOn(
        openAuthModal,
        "openAuthToSatisfyIntent"
      )

      renderWithRelay({
        Artist: () => ({
          name: "Example",
          slug: "example",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(openAuthToSatisfyIntent).toBeCalledWith(undefined, {
        contextModule: "artistHeader",
        entity: { name: "Example", slug: "example" },
        intent: "followArtist",
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
