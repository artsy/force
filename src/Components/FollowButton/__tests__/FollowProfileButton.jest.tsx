import { useSystemContext } from "System/useSystemContext"
import "jest-styled-components"
import { graphql } from "relay-runtime"
import { FollowProfileButtonFragmentContainer } from "../FollowProfileButton"
import * as openAuthModal from "Utils/openAuthModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowProfileButton_Test_Query } from "__generated__/FollowProfileButton_Test_Query.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "../useFollowButtonTracking"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.mock("../useFollowButtonTracking")

const onFollow = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<FollowProfileButton_Test_Query>({
  Component: props => {
    return (
      <FollowProfileButtonFragmentContainer
        // @ts-ignore RELAY UPGRADE 13
        profile={props.partner!.profile!}
        onFollow={onFollow}
      />
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

    // FIXME: SWC_COMPILER_MIGRATION
    it.skip("opens the auth modal", () => {
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
