import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { ConsignmentSubmissionStatusTestQuery } from "__generated__/ConsignmentSubmissionStatusTestQuery.graphql"
import { ConsignmentSubmissionStatusFragmentContainer } from "Components/Artwork/ConsignmentSubmissionStatus"

jest.unmock("react-relay")

describe("ConsignmentSubmissionStatus", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConsignmentSubmissionStatusTestQuery
  >({
    Component: props => {
      if (props.artwork) {
        return (
          <ConsignmentSubmissionStatusFragmentContainer {...(props as any)} />
        )
      }
      return null
    },
    query: graphql`
      query ConsignmentSubmissionStatusTestQuery @relay_test_operation {
        artwork(id: "artwork-id") {
          ...ConsignmentSubmissionStatus_artwork
        }
      }
    `,
  })

  it("displayas submission status when Approved", () => {
    renderWithRelay({
      Artwork: () => ({
        internalID: "artwork-id",
        consignmentSubmission: {
          internalID: "submission-id",
          state: "APPROVED",
          stateLabel: "Approved",
          actionLabel: "Complete Listing",
        },
      }),
    })

    expect(screen.getByText("Approved")).toBeInTheDocument()
    expect(screen.getByText("Complete Listing")).toBeInTheDocument()
  })

  it("displayas submission status when Listed", () => {
    renderWithRelay({
      Artwork: () => ({
        internalID: "artwork-id",
        isListed: true,
        consignmentSubmission: {},
      }),
    })

    expect(screen.getByText("Listed")).toBeInTheDocument()
  })
})
