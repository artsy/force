import { ConversationMessages } from "../ConversationMessages"
import { mount } from "enzyme"
import React from "react"

describe("ConversationMessages", () => {
  it("check components render", () => {
    const wrapper = mount(
      <ConversationMessages
        messages={
          {
            edges: [
              {
                node: {
                  __typename: "Message",
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
                  __typename: "Message",
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
        events={
          {
            edges: [
              {
                node: {
                  buyerAction: "OFFER_ACCEPTED_CONFIRM_NEEDED",
                  internalID: "7adde1e2-bdd4-4360-9484-989d6dd3248esss",
                  id: "7adde1e2-bdd4-4360-9484-989d6dd3248esss",

                  orderHistory: [
                    {
                      __typename: "CommerceOfferSubmittedEvent",
                      internalID: "7adde1e2-bdd4-4360-9484-989d6dd3248e",
                      createdAt: Date.now().toString(),
                      state: "PENDING",
                      stateReason: null,
                      offer: {
                        amount: "£40,000",
                        definesTotal: true,
                        fromParticipant: "SELLER",
                        offerAmountChanged: false,
                        respondsTo: {
                          fromParticipant: "BUYER",
                        },
                      },
                    },
                    {
                      __typename: "CommerceOrderStateChangedEvent",
                      internalID: "7adde1e2-bdd4-4360-9484-989d6dde",

                      createdAt: Date.now().toString(),
                      state: "APPROVED",
                      stateReason: null,
                      offer: {
                        amount: "£40,000",
                        definesTotal: true,
                        fromParticipant: "SELLER",
                        offerAmountChanged: false,
                        respondsTo: {
                          fromParticipant: "BUYER",
                        },
                      },
                    },
                  ],
                },
              },
            ],
          } as any
        }
      />
    )
    expect(wrapper.find("Message").length).toBe(2)
    expect(wrapper.find("OrderUpdate").length).toBe(2)
  })
})
