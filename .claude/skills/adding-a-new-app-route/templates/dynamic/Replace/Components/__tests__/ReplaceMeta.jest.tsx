import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ReplaceMeta_Test_Query } from "__generated__/ReplaceMeta_Test_Query.graphql"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { ReplaceMetaFragmentContainer } from "../ReplaceMeta"

jest.unmock("react-relay")

const mockUseRouter = jest.fn()
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockUseRouter(),
}))

const { renderWithRelay } = setupTestWrapperTL<ReplaceMeta_Test_Query>({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <ReplaceMetaFragmentContainer artist={props.artist} />
      </HeadProvider>
    )
  },
  query: graphql`
    query ReplaceMeta_Test_Query @relay_test_operation {
      artist(id: "claude-monet") {
        ...ReplaceMeta_artist
      }
    }
  `,
})

describe("ReplaceMeta", () => {
  beforeEach(() => {
    jest.clearAllMocks()

    mockUseRouter.mockReturnValue({
      match: {
        location: {
          pathname: "/replace/claude-monet",
          query: {},
          hash: undefined,
        },
      },
    })
  })

  it("renders title", () => {
    renderWithRelay()

    const titleTag = document.querySelector("title")
    expect(titleTag?.textContent).toBe("Replace | Artsy")
  })

  it("renders description", () => {
    const artist = { name: "Claude Monet" }

    renderWithRelay({ Artist: () => artist })

    const descriptionTagContent = document
      .querySelector("meta[name='description']")
      ?.getAttribute("content")

    expect(descriptionTagContent).toBe("Explore Claude Monet on Artsy.")
  })

  it("renders og:image", () => {
    const artist = {
      coverArtwork: { image: { large: "http://example.com/coverImage.jpg" } },
    }

    renderWithRelay({ Artist: () => artist })

    const imageTagContent = document
      .querySelector("meta[property='og:image']")
      ?.getAttribute("content")

    expect(imageTagContent).toContain(
      encodeURIComponent("http://example.com/coverImage.jpg"),
    )
  })

  describe("canonical url", () => {
    it("renders base pathname as canonical URL", () => {
      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/replace/claude-monet")
    })

    it("strips query parameters and hash from canonical URL", () => {
      mockUseRouter.mockReturnValue({
        match: {
          location: {
            pathname: "/replace/claude-monet",
            query: { someValue: "someParam" },
            hash: "someInternalAnchor",
          },
        },
      })

      renderWithRelay()

      const linkTag = document.querySelector("link[rel='canonical']")
      expect(linkTag?.getAttribute("href")).toEqual("/replace/claude-monet")
    })
  })
})
