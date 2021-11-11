import { mount } from "enzyme"
import { Message_message } from "v2/__generated__/Message_message.graphql"
import { Message as messageFixture } from "v2/Apps/__tests__/Fixtures/Conversation"
import { Message } from "../Message"

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
const message: Message_message = { " $refType": null, ...messageFixture }

describe("Message", () => {
  describe("linkify text", () => {
    it("converts links", () => {
      const linkBody = { body: "Link here: https://artsy.net." }
      const messageWithLink = { ...message, ...linkBody }

      const component = mount(<Message message={messageWithLink} />)
      expect(component.html()).toContain(
        'Link here: <a href="https://artsy.net" target="_blank">https://artsy.net</a>.'
      )
    })

    it("does not convert regular text", () => {
      const component = mount(<Message message={message} />)
      expect(component.html()).toContain("Body of the message")
    })
  })
})
