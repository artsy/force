import { useSystemContext } from "v2/System/useSystemContext"
import "jest-styled-components"
import { graphql } from "relay-runtime"
import { FollowProfileButtonFragmentContainer } from "../FollowProfileButton"
import * as openAuthModal from "v2/Utils/openAuthModal"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowProfileButton_Test_Query } from "v2/__generated__/FollowProfileButton_Test_Query.graphql"
import { useMutation } from "v2/Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "../useFollowButtonTracking"

jest.unmock("react-relay")

jest.mock("v2/Utils/Hooks/useMutation")
jest.mock("v2/System/useSystemContext")
jest.mock("../useFollowButtonTracking")

const { renderWithRelay } = setupTestWrapperTL<FollowProfileButton_Test_Query>({
  Component: props => {
    return (
      <FollowProfileButtonFragmentContainer profile={props.partner!.profile!} />
    )
  },
  query: graphql`
    query FollowProfileButton_Test_Query @relay_test_operation {
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
      const openAuthToSatisfyIntent = jest.spyOn(
        openAuthModal,
        "openAuthToSatisfyIntent"
      )

      renderWithRelay({
        Profile: () => ({
          name: "Salon 94",
          slug: "salon-94",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(openAuthToSatisfyIntent).toBeCalledWith(undefined, {
        contextModule: "partnerHeader",
        entity: { name: "Salon 94", slug: "salon-94" },
        intent: "followPartner",
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
  })
})
