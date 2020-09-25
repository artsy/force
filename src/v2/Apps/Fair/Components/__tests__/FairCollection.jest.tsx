import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { graphql } from "react-relay"
import { FairCollectionFragmentContainer } from "../FairCollections"
import { FairCollection_QueryRawResponse } from "v2/__generated__/FairCollection_Query.graphql"

jest.unmock("react-relay")

describe("FairCollection", () => {
  const getWrapper = async (
    response: FairCollection_QueryRawResponse = FAIR_COLLECTION_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ marketingCollection: collection }) => {
        return <FairCollectionFragmentContainer collection={collection} />
      },
      query: graphql`
        query FairCollection_Query($slug: String!) @raw_response_type {
          marketingCollection(slug: $slug) {
            ...FairCollection_collection
          }
        }
      `,
      variables: {
        slug: "xxx",
      },
      mockData: response,
    })
  }

  it("renders correctly", async () => {
    const wrapper = await getWrapper()
    const html = wrapper.html()
    expect(wrapper.text()).toContain("Contemporary Street Art")
    expect(wrapper.find("img").length).toBe(3)
    expect(html).toContain("first.jpg")
    expect(html).toContain("second.jpg")
    expect(html).toContain("third.jpg")
  })

  it("renders despite missing images", async () => {
    const wrapper = await getWrapper({
      marketingCollection: {
        id: "xxx",
        slug: "street-art-now",
        title: "Contemporary Street Art",
        category: "Street Art",
        artworks: {
          id: "xxx1",
          edges: [
            {
              node: {
                id: "xxx2",
                image: {
                  url: "https://example.com/first.jpg",
                },
              },
            },
            {
              node: {
                id: "xxx3",
                image: {
                  url: "https://example.com/second.jpg",
                },
              },
            },
            {
              node: {
                id: "xxx4",
                // Artwork missing image
                image: null,
              },
            },
          ],
        },
      },
    })

    const html = wrapper.html()

    expect(wrapper.text()).toContain("Contemporary Street Art")
    expect(wrapper.find("img").length).toBe(2)
    expect(html).toContain("first.jpg")
    expect(html).toContain("second.jpg")
    expect(html).not.toContain("third.jpg")
  })
})

const FAIR_COLLECTION_FIXTURE: FairCollection_QueryRawResponse = {
  marketingCollection: {
    id: "xxx",
    slug: "street-art-now",
    title: "Contemporary Street Art",
    category: "Street Art",
    artworks: {
      id: "xxx1",
      edges: [
        {
          node: {
            id: "xxx2",
            image: {
              url: "https://example.com/first.jpg",
            },
          },
        },
        {
          node: {
            id: "xxx3",
            image: {
              url: "https://example.com/second.jpg",
            },
          },
        },
        {
          node: {
            id: "xxx4",
            image: {
              url: "https://example.com/third.jpg",
            },
          },
        },
      ],
    },
  },
}
