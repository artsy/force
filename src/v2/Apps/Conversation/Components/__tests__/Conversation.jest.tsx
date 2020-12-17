import { mount } from "enzyme"
import React from "react"
import { Item } from "../Item"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"

describe("Conversation", () => {
  describe("Item", () => {
    describe("when inquiry item is an artwork", () => {
      const artworkItemProps: Conversation_conversation["items"][0]["item"] = {
        __typename: "Artwork",
        artistNames: "Banksy",
        date: "June 22, 2020",
        href: "site.com/banksy",
        id: "12345",
        image: {
          url: "image.com/banksy-image",
        },
        listPrice: {
          __typename: "Money",
          display: "$2000",
        },
        title: "Untitled",
      }

      it("renders the artwork item", () => {
        const wrapper = mount(<Item item={artworkItemProps} />)
        const imageSrc = wrapper.find("Image").first().prop("src")
        const linkHref = wrapper.find("Link").first().prop("href")
        const name = wrapper.find("Sans").first()
        const title = wrapper.find("Sans").at(1)
        const price = wrapper.find("Sans").last()

        expect(imageSrc).toBe("image.com/banksy-image")
        expect(linkHref).toBe("site.com/banksy")
        expect(name.text()).toContain("Banksy")
        expect(title.text()).toContain("Untitled / June 22, 2020")
        expect(price.text()).toContain("$2000")
      })
    })

    describe("when inquiry item is a show", () => {
      const showItemProps: Conversation_conversation["items"][0]["item"] = {
        __typename: "Show",
        coverImage: {
          url: "image.com/fair-image",
        },
        fair: {
          exhibitionPeriod: "June 25 - June 28",
          location: {
            city: "New York",
          },
          name: "Art Fair 2020",
        },
        href: "site.com/art-fair-2020",
        id: "12345",
        name: "Art Fair 2020",
      }

      it("renders the show item", () => {
        const wrapper = mount(<Item item={showItemProps} />)
        const imageSrc = wrapper.find("Image").first().prop("src")
        const linkHref = wrapper.find("Link").first().prop("href")
        const name = wrapper.find("Sans").first()
        const locationAndDate = wrapper.find("Sans").last()

        expect(imageSrc).toBe("image.com/fair-image")
        expect(linkHref).toBe("site.com/art-fair-2020")
        expect(name.text()).toContain("Art Fair 2020")
        expect(locationAndDate.text()).toContain("New York, June 25 - June 28")
      })
    })
  })

  describe("when inquiry item is %other", () => {
    const otherItemProps: Conversation_conversation["items"][0]["item"] = {
      __typename: "%other",
    }

    it("renders the show item", () => {
      const wrapper = mount(<Item item={otherItemProps} />)

      expect(wrapper.find("Link")).toHaveLength(0)
      expect(wrapper.children()).toHaveLength(0)
    })
  })
})
