import { mount } from "enzyme"
import { Item } from "../Item"
import { Conversation_conversation } from "v2/__generated__/Conversation_conversation.graphql"

describe("Item", () => {
  describe("when inquiry item is an artwork", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
      const wrapper = mount(<Item item={artworkItemProps} />)
      const imageSrc = wrapper.find("Image").first().prop("src")
      const linkHref = wrapper.find("Link").first().prop("href")
      const name = wrapper.find("Text").first()
      const title = wrapper.find("Text").at(1)
      const price = wrapper.find("Text").last()

      console.log(wrapper.text())

      expect(imageSrc).toBe("image.com/banksy-image")
      expect(linkHref).toBe("site.com/banksy")
      expect(name.text()).toContain("Banksy")
      expect(title.text()).toContain("Untitled / June 22, 2020")
      expect(price.text()).toContain("$2000")
    })
  })

  describe("when inquiry item is a show", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
      const wrapper = mount(<Item item={showItemProps} />)
      const imageSrc = wrapper.find("Image").first().prop("src")
      const linkHref = wrapper.find("Link").first().prop("href")
      const name = wrapper.find("Text").first()
      const locationAndDate = wrapper.find("Text").last()

      expect(imageSrc).toBe("image.com/fair-image")
      expect(linkHref).toBe("site.com/art-fair-2020")
      expect(name.text()).toContain("Art Fair 2020")
      expect(locationAndDate.text()).toContain("New York, June 25 - June 28")
    })
  })

  describe("when inquiry item is %other", () => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
