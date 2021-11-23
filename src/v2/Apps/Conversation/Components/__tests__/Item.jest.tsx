import { screen } from "@testing-library/react"
import { ItemFragmentContainer } from "../Item"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

const query = graphql`
  query Item_Test_Query {
    me {
      conversation(id: "test-id") {
        items {
          item {
            ...Item_item
          }
        }
      }
    }
  }
`

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ me }: any) => {
    return <ItemFragmentContainer item={me.conversation.items[0].item} />
  },
  query,
})

describe("Item", () => {
  describe("when inquiry item is an artwork", () => {
    it("renders the artwork item", async () => {
      renderWithRelay({
        Conversation: () => ({
          items: [
            {
              item: {
                __typename: "Artwork",
                artistNames: "Banksy",
                date: "June 22, 2020",
                title: "Untitled",
                href: "site.com/banksy",
                image: {
                  url: "image.com/banksy-image",
                },
                listPrice: {
                  __typename: "Money",
                  display: "$2000",
                },
              },
            },
          ],
        }),
      })

      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "image.com/banksy-image"
      )
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "site.com/banksy"
      )
      expect(screen.getByText("Banksy")).toBeInTheDocument()
      expect(screen.getByText("Untitled / June 22, 2020")).toBeInTheDocument()
      expect(screen.getByText("$2000")).toBeInTheDocument()
    })
  })

  describe("when inquiry item is a show", () => {
    it("renders the show item", () => {
      renderWithRelay({
        Conversation: () => ({
          items: [
            {
              item: {
                __typename: "Show",
                fair: {
                  name: "Art Fair 2020",
                  exhibitionPeriod: "June 25 - June 28",
                  location: {
                    city: "New York",
                  },
                },
                href: "site.com/art-fair-2020",
                name: "Art Fair 2020",
                coverImage: {
                  url: "image.com/fair-image",
                },
              },
            },
          ],
        }),
      })

      expect(screen.getByRole("img")).toHaveAttribute(
        "src",
        "image.com/fair-image"
      )
      expect(screen.getByRole("link")).toHaveAttribute(
        "href",
        "site.com/art-fair-2020"
      )
      expect(screen.getByText("Art Fair 2020")).toBeInTheDocument()
      expect(
        screen.getByText("New York, June 25 - June 28")
      ).toBeInTheDocument()
    })
  })

  describe("when inquiry item is %other", () => {
    it("renders the show item", () => {
      renderWithRelay({
        Conversation: () => ({
          items: [
            {
              item: { __typename: "%other" },
            },
          ],
        }),
      })

      expect(screen.queryAllByRole("link")).toStrictEqual([])
    })
  })
})
