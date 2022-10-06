import { useSystemContext } from "System/useSystemContext"
import "jest-styled-components"
import { graphql } from "react-relay"
import { FollowGeneButtonFragmentContainer } from "Components/FollowButton/FollowGeneButton"
import * as openAuthModal from "Utils/openAuthModal"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { fireEvent, screen } from "@testing-library/react"
import { FollowGeneButton_Test_Query } from "__generated__/FollowGeneButton_Test_Query.graphql"
import { useMutation } from "Utils/Hooks/useMutation"
import { useFollowButtonTracking } from "Components/FollowButton/useFollowButtonTracking"

jest.unmock("react-relay")

jest.mock("Utils/Hooks/useMutation")
jest.mock("System/useSystemContext")
jest.mock("../useFollowButtonTracking")

const onFollow = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<FollowGeneButton_Test_Query>({
  Component: props => {
    return (
      <FollowGeneButtonFragmentContainer
        gene={props.gene!}
        onFollow={onFollow}
      />
    )
  },
  query: graphql`
    query FollowGeneButton_Test_Query @relay_test_operation {
      gene(id: "example") {
        ...FollowGeneButton_gene
      }
    }
  `,
})

describe("FollowGeneButton", () => {
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
        Gene: () => ({
          name: "Example",
          slug: "example",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(openAuthToSatisfyIntent).toBeCalledWith(undefined, {
        contextModule: "geneHeader",
        entity: { name: "Example", slug: "example" },
        intent: "followGene",
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
        Gene: () => ({
          internalID: "example",
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(submitMutation).toBeCalledWith({
        variables: {
          input: {
            geneID: "example",
            unfollow: false,
          },
        },
      })
    })

    it("tracks the follow click when following", () => {
      renderWithRelay({
        Gene: () => ({
          isFollowed: false,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(false)
    })

    it("tracks the unfollow click when unfollowing", () => {
      renderWithRelay({
        Gene: () => ({
          isFollowed: true,
        }),
      })

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(trackFollow).toBeCalledWith(true)
    })

    it("calls the onFollow callback", () => {
      renderWithRelay({
        Gene: () => ({
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
