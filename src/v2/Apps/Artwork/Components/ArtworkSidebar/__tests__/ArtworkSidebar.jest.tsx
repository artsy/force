import { ArtworkSidebarFragmentContainer } from "v2/Apps/Artwork/Components/ArtworkSidebar"
import { ArtworkSidebarArtists } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarArtists"
import { ArtworkSidebarMetadata } from "v2/Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarMetadata"
import { graphql } from "react-relay"
import {
  setupTestWrapper,
  setupTestWrapperTL,
} from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { useSystemContext } from "v2/System"

jest.unmock("react-relay")
jest.mock("../ArtworkSidebarClassification", () => ({
  ArtworkSidebarClassificationFragmentContainer: () => <div />,
}))
jest.mock("v2/System/Analytics/useTracking", () => ({
  useTracking: () => ({ trackEvent: jest.fn() }),
}))
jest.mock("v2/System/useSystemContext")

const mockUseSystemContext = useSystemContext as jest.Mock
let mockFeatureFlags

const { getWrapper } = setupTestWrapper({
  Component: ArtworkSidebarFragmentContainer,
  query: graphql`
    query ArtworkSidebar_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar_artwork
      }
      me {
        ...ArtworkSidebar_me
      }
    }
  `,
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArtworkSidebarFragmentContainer,
  query: graphql`
    query ArtworkSidebar_Test_Query @relay_test_operation {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebar_artwork
      }
      me {
        ...ArtworkSidebar_me
      }
    }
  `,
})

describe("ArtworkSidebar", () => {
  beforeEach(() => {
    mockFeatureFlags = {
      featureFlags: {
        "artwork-page-create-alert": {
          flagEnabled: false,
          variant: { name: "enabled", enabled: false },
        },
      },
    }

    mockUseSystemContext.mockImplementation(() => mockFeatureFlags)
  })

  it("renders ArtworkSidebarArtists component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarArtists).length).toBe(1)
  })

  it("renders Metadata component", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(ArtworkSidebarMetadata).length).toBe(1)
  })

  it("renders the create alert section when artwork-page-create-alert ff is enabled", () => {
    mockFeatureFlags = {
      featureFlags: {
        "artwork-page-create-alert": {
          flagEnabled: true,
          variant: { name: "enabled", enabled: false },
        },
      },
    }

    mockUseSystemContext.mockImplementationOnce(() => mockFeatureFlags)

    renderWithRelay()

    expect(screen.queryByText(/Create Alert/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/Be notified when a similar piece is available/i)
    ).toBeInTheDocument()
  })

  it("does not render the create alert section when artwork-page-create-alert ff is enabled", () => {
    renderWithRelay()

    expect(screen.queryByText(/Create Alert/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/Be notified when a similar piece is available/i)
    ).not.toBeInTheDocument()
  })
})
