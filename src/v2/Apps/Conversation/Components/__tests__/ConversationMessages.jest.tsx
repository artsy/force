import { ConversationMessages } from "../ConversationMessages"
import { mount } from "enzyme"
import React from "react"

describe("ConversationMessages", () => {
  it("filters out empty and null messages", () => {
    const wrapper = mount(
      <ConversationMessages
        messages={
          {
            edges: [
              {
                node: null,
              },
              {
                node: {
                  attachments: [],
                  body: "",
                  createdAt: Date.now().toString(),
                  id: "123",
                  internalID: "123",
                  isFromUser: true,
                },
              },
              {
                node: {
                  attachments: [],
                  body: "hello world",
                  createdAt: Date.now().toString(),
                  id: "456",
                  internalID: "456",
                  isFromUser: true,
                },
              },
            ],
          } as any
        }
      />
    )
    expect(wrapper.find("Message").length).toBe(1)
  })
})
