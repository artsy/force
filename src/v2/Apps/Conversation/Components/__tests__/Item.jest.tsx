import { screen, render } from "@testing-library/react"
import { Item } from "../Item"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"

describe("Item", () => {
  describe("when inquiry item is an artwork", () => {
    // @ts-ignore
    const artworkItemProps: Conversation_conversation["items"][0]["item"] = {
      __typename: "Artwork",
      id: "12345",
      date: "June 22, 2020",
      title: "Untitled",
      artistNames: "Banksy",
      href: "site.com/banksy",
      image: {
        url: "image.com/banksy-image",
      },
      listPrice: {
        __typename: "Money",
        display: "$2000",
      },
    }

    it("renders the artwork item", () => {
      render(<Item item={artworkItemProps} />)

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
    // @ts-ignore
    const showItemProps: Conversation_conversation["items"][0]["item"] = {
      __typename: "Show",
      id: "12345",
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
    }

    it("renders the show item", () => {
      render(<Item item={showItemProps} />)

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
    // @ts-ignore
    const otherItemProps: Conversation_conversation["items"][0]["item"] = {
      __typename: "%other",
    }

    it("renders the show item", () => {
      render(<Item item={otherItemProps} />)

      expect(screen.queryAllByRole("link")).toStrictEqual([])
    })
  })
})
