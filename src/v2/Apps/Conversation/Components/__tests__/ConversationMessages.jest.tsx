import { ConversationMessages } from "../ConversationMessages"
import { render, screen } from "@testing-library/react"

const message = {
  edges: [
    {
      node: {
        __typename: "Message",
        id: "123",
        internalID: "123",
        body: "First test message",
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
        body: "Second test message",
        isFromUser: true,
        createdAt: Date.now().toString(),
        attachments: [],
      },
    },
  ],
} as any
const events = {
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

describe("ConversationMessages", () => {
  it("check components render", () => {
    render(<ConversationMessages messages={message} events={events} />)

    expect(
      screen.getByText("Offer Accepted - Pending Action")
    ).toBeInTheDocument()
    expect(screen.getByText("Offer Accepted")).toBeInTheDocument()
    expect(screen.getByText("First test message")).toBeInTheDocument()
    expect(screen.getByText("Second test message")).toBeInTheDocument()
  })
})
