import { screen } from "@testing-library/react"
import { ArtistAbout } from "Apps/Artist/Components/Artist2/Components/ArtistAbout"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ArtistAbout", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return <ArtistAbout artist={props.artist} />
    },
    query: graphql`
      query ArtistAbout_Test_Query @relay_test_operation {
        artist(id: "example") {
          ...ArtistAbout_artist
        }
      }
    `,
  })

  it("renders the biography section heading", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        biographyBlurb: {
          text: "A painter of landscapes.",
          credit: null,
        },
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(screen.getByText("About Francesca Mollett")).toBeInTheDocument()
  })

  it("renders the biography text", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        biographyBlurb: {
          text: "A painter of landscapes.",
          credit: null,
        },
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(screen.getByText(/A painter of landscapes\./)).toBeInTheDocument()
  })

  it("appends credit to biography text when both are present", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        biographyBlurb: {
          text: "A painter of landscapes.",
          credit: "Submitted by [Galerie Foo](/foo)",
        },
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(
      screen.getByText(
        /A painter of landscapes\. Submitted by \[Galerie Foo\]\(\/foo\)/,
      ),
    ).toBeInTheDocument()
  })

  it("does not render biography section when biographyBlurb is absent", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        biographyBlurb: null,
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(
      screen.queryByText("About Francesca Mollett"),
    ).not.toBeInTheDocument()
  })

  it("renders the key facts section", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        movementGenes: [
          { name: "Impressionism", slug: "impressionism" },
          { name: "Post-Impressionism", slug: "post-impressionism" },
        ],
        mediumGenes: [
          { name: "Oil Paint", slug: "oil-paint" },
          { name: "Watercolor", slug: "watercolor" },
        ],
      }),
    })

    expect(screen.getByText("Impressionism")).toBeInTheDocument()
    expect(screen.getByText("Post-Impressionism")).toBeInTheDocument()
    expect(screen.getByText("Oil Paint")).toBeInTheDocument()
    expect(screen.getByText("Watercolor")).toBeInTheDocument()
  })

  it("does not render movements when empty", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        movementGenes: [],
        mediumGenes: [
          { name: "Oil Paint", slug: "oil-paint" },
          { name: "Watercolor", slug: "watercolor" },
        ],
      }),
    })

    expect(screen.queryByText("Movements")).not.toBeInTheDocument()
    expect(screen.queryByText("Mediums")).toBeInTheDocument()
  })

  it("does not render mediums when empty", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        movementGenes: [
          { name: "Impressionism", slug: "impressionism" },
          { name: "Post-Impressionism", slug: "post-impressionism" },
        ],
        mediumGenes: [],
      }),
    })

    expect(screen.queryByText("Movements")).toBeInTheDocument()
    expect(screen.queryByText("Mediums")).not.toBeInTheDocument()
  })

  it("does not render key facts section at all when all genes are empty", () => {
    renderWithRelay({
      Artist: () => ({
        name: "Francesca Mollett",
        movementGenes: [],
        mediumGenes: [],
      }),
    })

    expect(screen.queryByText("Movements")).not.toBeInTheDocument()
    expect(screen.queryByText("Mediums")).not.toBeInTheDocument()
    expect(screen.queryByTestId("artist-key-facts")).not.toBeInTheDocument()
  })
})
