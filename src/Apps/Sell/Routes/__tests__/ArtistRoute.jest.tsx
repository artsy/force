import { screen } from "@testing-library/dom"
import { waitFor } from "@testing-library/react"
import { ArtistRouteFragmentContainer } from "Apps/Sell/Routes/ArtistRoute"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { trackEvent } from "Server/analytics/helpers"
import { useRouter } from "System/Router/useRouter"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")

jest.mock("System/Router/useRouter")
jest.mock("System/useSystemContext")

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return <ArtistRouteFragmentContainer submission={props.submission} />
  },
  query: graphql`
    query ArtistRoute_Test_Query @raw_response_type {
      submission(id: "example") {
        ...ArtistRoute_submission
      }
    }
  `,
})

describe("ArtistRoute", () => {
  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    ;(useRouter as jest.Mock).mockImplementation(() => {
      return {
        match: {
          params: {
            id: "12345",
          },
        },
        router: {
          push: jest.fn(),
        },
      }
    })
  })

  it("renders the submission with artist", async () => {
    renderWithRelay({
      Submission: () => ({
        internalID: "example",
        artist: {
          internalID: "example-id",
          targetSupply: {
            isTargetSupply: true,
          },
          name: "Example Artist",
        },
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Add artist name")).toBeInTheDocument()
    })
  })
})
