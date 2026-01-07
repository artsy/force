import { FairMetaFragmentContainer } from "Apps/Fair/Components/FairMeta"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

jest.mock("Utils/getENV", () => ({
  getENV: (name: string) => {
    return {
      APP_URL: "https://www.artsy.net",
      GEMINI_CLOUDFRONT_URL: "",
    }[name]
  },
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => {
    return (
      <HeadProvider>
        <FairMetaFragmentContainer fair={props.fair} />
      </HeadProvider>
    )
  },
  query: graphql`
    query FairMeta_Test_Query @relay_test_operation {
      fair(id: "example") {
        ...FairMeta_fair
      }
    }
  `,
})

const getTags = () => {
  const meta = [...document.getElementsByTagName("meta")].map(tag => ({
    name: tag.getAttribute("name"),
    property: tag.getAttribute("property"),
    content: tag.getAttribute("content"),
  }))

  const links = [...document.getElementsByTagName("link")].map(tag => ({
    rel: tag.getAttribute("rel"),
    href: tag.getAttribute("href"),
  }))

  const title = document.getElementsByTagName("title")[0]?.textContent

  return { meta, links, title }
}

describe("FairMeta", () => {
  const mockUseRouter = useRouter as jest.Mock

  beforeEach(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/test-fair/info",
        },
      },
    }))
  })

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  it("generates canonical URL", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Test Fair",
        slug: "test-fair",
      }),
    })

    const tags = getTags()
    const canonicalLink = tags.links.find(link => link.rel === "canonical")

    expect(canonicalLink?.href).toBe("https://www.artsy.net/fair/test-fair")
  })

  it("renders correct title", () => {
    renderWithRelay({
      Fair: () => ({
        name: "Amazing Art Fair",
        slug: "amazing-art-fair",
      }),
    })

    const tags = getTags()
    expect(tags.title).toBe("Amazing Art Fair | Artsy")
  })

  it("returns null when on overview route", () => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          pathname: "/fair/test-fair",
        },
      },
    }))

    renderWithRelay({
      Fair: () => ({
        name: "Test Fair",
        slug: "test-fair",
      }),
    })

    const tags = getTags()
    expect(tags.title).toBeUndefined()
    expect(tags.links.find(link => link.rel === "canonical")).toBeUndefined()
  })
})
