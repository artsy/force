import { graphql } from "react-relay"
import { ArtistHeaderFragmentContainer } from "../ArtistHeader"
import { useTracking } from "react-tracking"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("react-tracking")

jest.mock("react-head", () => ({
  Link: () => null,
}))

jest.mock("Apps/Artist/Components/ArtistInsights", () => {
  return {
    ArtistInsightPillsFragmentContainer: () => {
      return null
    },
  }
})

const mockuseTracking = useTracking as jest.Mock
const trackingSpy = jest.fn()

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtistHeaderFragmentContainer,
  query: graphql`
    query ArtistHeader_Test_Query @relay_test_operation {
      artist(id: "example") {
        ...ArtistHeader_artist
      }
    }
  `,
})

describe("ArtistHeader", () => {
  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("renders correctly", () => {
    renderWithRelay({
      Artist: () => ({
        name: "artistName",
        slug: "artistSlug",
        counts: { follows: 111 },
        formattedNationalityAndBirthday: "USA, Jan 1 1980",
        biographyBlurb: { text: "biographyBlurbText", credit: false },
      }),
    })

    expect(screen.getByText("artistName")).toBeInTheDocument()
    expect(screen.getByText("USA, Jan 1 1980")).toBeInTheDocument()
    expect(screen.getByText("111 Followers")).toBeInTheDocument()
    expect(screen.getByText("biographyBlurbText")).toBeInTheDocument()
    const cvLink = screen.getByText("See all past shows and fair booths")
    expect(cvLink).toHaveAttribute(
      "href",
      expect.stringContaining("/artist/artistSlug/cv")
    )
  })

  it("hides bio section and cv link if partner supplied bio", () => {
    renderWithRelay({
      Artist: () => ({
        biographyBlurb: { text: "biographyBlurbText", credit: true },
      }),
    })

    expect(screen.queryByText("biographyBlurbText")).not.toBeInTheDocument()
    expect(
      screen.queryByText("See all past shows and fair booths")
    ).not.toBeInTheDocument()
  })

  it("hides follows if count is zero", () => {
    renderWithRelay({
      Artist: () => ({
        counts: { follows: 0 },
      }),
    })

    expect(screen.queryByText("0 Followers")).not.toBeInTheDocument()
  })
})
