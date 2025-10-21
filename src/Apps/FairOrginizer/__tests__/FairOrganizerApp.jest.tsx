import { FairOrganizerAppFragmentContainer } from "Apps/FairOrginizer/FairOrganizerApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { FairOrganizerAppTestQuery } from "__generated__/FairOrganizerAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FairOrganizerAppTestQuery>({
  Component: ({ fairOrganizer }) => (
    <MockBoot>
      <FairOrganizerAppFragmentContainer fairOrganizer={fairOrganizer!} />
    </MockBoot>
  ),
  query: graphql`
    query FairOrganizerAppTestQuery @relay_test_operation {
      fairOrganizer(id: "example") {
        ...FairOrganizerApp_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerApp", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = ""
  })

  it("sets a title tag", () => {
    renderWithRelay({
      FairOrganizer: () => ({ name: "Art Paris", slug: "art-paris" }),
    })

    expect(document.title).toEqual("Art Paris | Artsy")
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay()
    expect(container).toBeInTheDocument()
  })

  it("adds `noindex, nofollow` when profile.isPublished is false", () => {
    renderWithRelay({
      FairOrganizer: () => ({
        name: "Art Dusseldorf",
        slug: "art-dusseldorf",
        profile: {
          image: { url: "https://example/image.jpg" },
          isPublished: false,
        },
      }),
    })

    const robots = document.head.querySelector('meta[name="robots"]')
    expect(robots).toBeInTheDocument()
    expect(robots!.getAttribute("content")).toBe("noindex, nofollow")
  })

  it("does not add robots meta when profile.isPublished is true", () => {
    renderWithRelay({
      FairOrganizer: () => ({
        name: "Art Dusseldorf",
        slug: "art-dusseldorf",
        profile: {
          image: { url: "https://example/image.jpg" },
          isPublished: true,
        },
      }),
    })

    const robots = document.head.querySelector('meta[name="robots"]')
    expect(robots).toBeNull()
  })
})
