import { graphql } from "react-relay"
import { ArtworkSidebarClassificationFragmentContainer } from "../../ArtworkSidebar/ArtworkSidebarClassification"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.mock("v2/Components/ArtworkClassifications", () => ({
  ArtworkClassificationsQueryRenderer: () =>
    "ArtworkClassificationsQueryRenderer",
}))

jest.mock("v2/Components/Modal/Modal", () => ({
  __esModule: true,
  default: ({ show, children }: any) => {
    return show ? children : null
  },
}))

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ArtworkSidebarClassificationFragmentContainer,
  query: graphql`
    query ArtworkSidebarClassification_Test_Query @raw_response_type {
      artwork(id: "josef-albers-homage-to-the-square-85") {
        ...ArtworkSidebarClassification_artwork
      }
    }
  `,
})

describe("ArtworkSidebarClassification", () => {
  describe("for artwork with classification", () => {
    it("displays classification", () => {
      const wrapper = getWrapper({
        AttributionClass: () => ({
          shortDescription: "This is a unique works",
        }),
      })

      expect(wrapper.html()).toContain("This is a unique work")
    })

    describe("modal pop up", () => {
      it("shows a modal on Classification details click", () => {
        const wrapper = getWrapper()

        expect(wrapper.html()).not.toContain(
          "ArtworkClassificationsQueryRenderer"
        )

        wrapper.find("button").simulate("click")

        expect(wrapper.html()).toContain("ArtworkClassificationsQueryRenderer")
      })
    })

    describe("for artwork without classification", () => {
      it("does not render anything", () => {
        const wrapper = getWrapper({
          Artwork: () => ({ attributionClass: null }),
        })

        expect(wrapper.html()).toBeFalsy()
      })
    })
  })
})
