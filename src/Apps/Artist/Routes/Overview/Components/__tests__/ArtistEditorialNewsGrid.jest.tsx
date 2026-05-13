import { fireEvent, render, screen } from "@testing-library/react"
import { ArtistEditorialNewsGridQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsGrid"
import { MockBoot } from "DevTools/MockBoot"
import { RelayEnvironmentProvider } from "react-relay"
import { useTracking } from "react-tracking"
import { MockPayloadGenerator, createMockEnvironment } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  useDidMount: () => true,
}))
jest.mock("react-tracking")
jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(() => false),
  useVariant: jest.fn(() => ({ enabled: false, name: "disabled" })),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "example-artist-id",
    contextPageOwnerSlug: "example-artist-slug",
    contextPageOwnerType: "artist",
  })),
}))

const trackEvent = jest.fn()

beforeAll(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({ trackEvent }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe("ArtistEditorialNewsGrid", () => {
  it("renders the editorial grid", () => {
    renderWithRelay()

    expect(screen.getByText(/Artsy Editorial Featuring/)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View All" })).toBeInTheDocument()
  })

  describe("tracking", () => {
    it("tracks article clicks", () => {
      renderWithRelay()

      const links = screen.getAllByRole("link")
      expect(links.length).toBeGreaterThan(1)

      fireEvent.click(links[1])

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "example-artist-id",
        context_page_owner_slug: "example-artist-slug",
        context_page_owner_type: "artist",
        destination_page_owner_type: "article",
        type: "thumbnail",
      })
    })

    it("tracks view all clicks", () => {
      renderWithRelay()

      fireEvent.click(screen.getByRole("link", { name: "View All" }))

      expect(trackEvent).toBeCalledWith({
        action: "clickedArticleGroup",
        context_module: "marketNews",
        context_page_owner_id: "example-artist-id",
        context_page_owner_slug: "example-artist-slug",
        context_page_owner_type: "artist",
        destination_page_owner_type: "articles",
        type: "viewAll",
      })
    })
  })
})

const renderWithRelay = () => {
  const env = createMockEnvironment()

  env.mock.queueOperationResolver(operation => {
    return MockPayloadGenerator.generate(operation)
  })

  return render(
    <MockBoot relayEnvironment={env}>
      <RelayEnvironmentProvider environment={env}>
        <ArtistEditorialNewsGridQueryRenderer id="test-artist" />
      </RelayEnvironmentProvider>
    </MockBoot>,
  )
}
