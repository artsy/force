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
                node: { href: "/gene/classic", id: "classic", name: "Classic" },
              },
              { node: { href: "/gene/modern", id: "modern", name: "Modern" } },
              {
                node: {
                  href: "/gene/postmodern",
                  id: "postmodern",
                  name: "Postmodern",
                },
              },
              {
                node: {
                  href: "/gene/contemporary",
                  id: "contemporary",
                  name: "Contemporary",
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
                node: { href: "/gene/classic", id: "classic", name: "Classic" },
              },
              { node: { href: "/gene/modern", id: "modern", name: "Modern" } },
              {
                node: {
                  href: "/gene/modern-revival",
                  id: "modern-revival",
                  name: "Modern revival",
                },
              },
              {
                node: {
                  href: "/gene/pre-postmodern",
                  id: "pre-postmodern",
                  name: "Pre postmodern",
                },
              },
              {
                node: {
                  href: "/gene/postmodern",
                  id: "postmodern",
                  name: "Postmodern",
                },
              },
              {
                node: {
                  href: "/gene/post-postmodern",
                  id: "post-postmodern",
                  name: "Post postmodern",
                },
              },
              {
                node: {
                  href: "/gene/hypermodern",
                  id: "hyper-modern",
                  name: "Hyper modern",
                },
              },
              {
                node: {
                  href: "/gene/contemporary",
                  id: "contemporary",
                  name: "Contemporary",
                },
              },
              {
                node: {
                  href: "/gene/post-contemporary",
                  id: "post-contmporary",
                  name: "Post contemporary",
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
