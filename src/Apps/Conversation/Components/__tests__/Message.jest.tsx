import { render, screen } from "@testing-library/react"
import { Message_message$data } from "__generated__/Message_message.graphql"
import { Message as messageFixture } from "Apps/__tests__/Fixtures/Conversation"
import { Message } from "../Message"

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
const message: Message_message$data = { " $refType": null, ...messageFixture }

describe("Message", () => {
  describe("linkify text", () => {
    it("converts links", () => {
      const linkBody = { body: "Link here: https://artsy.net." }
      const messageWithLink = { ...message, ...linkBody }
      render(<Message message={messageWithLink} />)

      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "https://artsy.net")
      expect(link).toHaveTextContent("https://artsy.net")
    })

    it("does not convert regular text", () => {
      render(<Message message={message} />)

      expect(screen.getByText("Body of the message")).toBeInTheDocument()
    })
  })
})
