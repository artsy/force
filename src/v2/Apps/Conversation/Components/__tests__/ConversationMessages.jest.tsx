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
                  id: "123",
                  internalID: "123",
                  body: "",
                  isFromUser: true,
                  createdAt: Date.now().toString(),
                  attachments: [],
                },
              },
              {
                node: {
                  id: "456",
                  internalID: "456",
                  body: "hello world",
                  isFromUser: true,
                  createdAt: Date.now().toString(),
                  attachments: [],
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
