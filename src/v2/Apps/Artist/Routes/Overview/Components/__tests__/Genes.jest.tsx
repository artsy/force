import {
  GenesTestQueryRawResponse,
  GenesTestQueryResponse,
} from "v2/__generated__/GenesTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { GenesFragmentContainer as Genes } from "../Genes"

jest.unmock("react-relay")

const render = (
  artist: GenesTestQueryRawResponse["artist"],
  extraProps?: Partial<ExtractProps<typeof Genes>>
) =>
  renderRelayTree({
    Component: (props: GenesTestQueryResponse) => (
      <Genes
        artist={{
          ...artist,
        }}
        {...props}
        {...extraProps}
      />
    ),
    mockData: {
      artist,
    } as GenesTestQueryRawResponse,
    query: graphql`
      query GenesTestQuery @raw_response_type {
        artist(id: "whatevs") {
          ...Genes_artist
        }
      }
    `,
  })

describe("Genes", () => {
  describe("when having less than 8 genes", () => {
    it("renders all genes", async () => {
      const component = await render({
        id: "pablo-picasso",
        related: {
          genes: {
            edges: [
              {
                node: { id: "classic", name: "Classic", href: "/gene/classic" },
              },
              { node: { id: "modern", name: "Modern", href: "/gene/modern" } },
              {
                node: {
                  id: "postmodern",
                  name: "Postmodern",
                  href: "/gene/postmodern",
                },
              },
              {
                node: {
                  id: "contemporary",
                  name: "Contemporary",
                  href: "/gene/contemporary",
                },
              },
            ],
          },
        },
      })
      expect(component.find("Tag").length).toBe(4)
      expect(component.find("MoreTag").length).toBe(0)
    })
  })
  describe("when having more than 8 genes", () => {
    it("renders first 8 genes and more button", async () => {
      const component = await render({
        id: "pablo-picasso",
        related: {
          genes: {
            edges: [
              {
                node: { id: "classic", name: "Classic", href: "/gene/classic" },
              },
              { node: { id: "modern", name: "Modern", href: "/gene/modern" } },
              {
                node: {
                  id: "modern-revival",
                  name: "Modern revival",
                  href: "/gene/modern-revival",
                },
              },
              {
                node: {
                  id: "pre-postmodern",
                  name: "Pre postmodern",
                  href: "/gene/pre-postmodern",
                },
              },
              {
                node: {
                  id: "postmodern",
                  name: "Postmodern",
                  href: "/gene/postmodern",
                },
              },
              {
                node: {
                  id: "post-postmodern",
                  name: "Post postmodern",
                  href: "/gene/post-postmodern",
                },
              },
              {
                node: {
                  id: "hyper-modern",
                  name: "Hyper modern",
                  href: "/gene/hypermodern",
                },
              },
              {
                node: {
                  id: "contemporary",
                  name: "Contemporary",
                  href: "/gene/contemporary",
                },
              },
              {
                node: {
                  id: "post-contmporary",
                  name: "Post contemporary",
                  href: "/gene/post-contemporary",
                },
              },
            ],
          },
        },
      })
      expect(component.find("Tag").length).toBe(8)
      expect(component.find("MoreTag").length).toBe(1)
    })
  })
})
