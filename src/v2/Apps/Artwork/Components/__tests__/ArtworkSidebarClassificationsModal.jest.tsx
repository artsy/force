import {
  ArtworkSidebarClassificationsModalFragmentContainer,
  ARTWORK_SIDEBAR_CLASSIFICATIONS_MODAL_QUERY,
} from "../ArtworkSidebarClassificationsModal"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    Modal: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ArtworkSidebarClassificationsModalFragmentContainer,
  query: ARTWORK_SIDEBAR_CLASSIFICATIONS_MODAL_QUERY,
})

describe("ArtworkSidebarClassificationsModal", () => {
  it("renders the classifications", () => {
    const wrapper = getWrapper({
      AttributionClass: () => ({
        name: "Unique",
        longDescription: "One of a kind piece, created by the artist.",
      }),
    })

    const html = wrapper.html()

    expect(html).toContain("Unique")
    expect(html).toContain("One of a kind piece, created by the artist.")
    expect(html).toContain(
      "Our partners are responsible for providing accurate classification information for all works."
    )
  })
})
