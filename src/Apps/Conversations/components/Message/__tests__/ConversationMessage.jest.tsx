import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { ConversationMessageTestQuery } from "__generated__/ConversationMessageTestQuery.graphql"
import { ConversationMessage } from "Apps/Conversations/components/Message/ConversationMessage"

jest.unmock("react-relay")

describe("ConversationMessage", () => {
  const { renderWithRelay } = setupTestWrapperTL<ConversationMessageTestQuery>({
    Component: ({ conversation }) => (
      <ConversationMessage
        message={conversation.messagesConnection.edges[0]?.node!}
        messages={[conversation.messagesConnection.edges[0]?.node as any]}
        messageIndex={1}
        // Serves to the tests related to "Seen by"
        isLastGroupedPartnerMessage={true}
      />
    ),
    query: graphql`
      query ConversationMessageTestQuery @relay_test_operation {
        conversation(id: "123") @required(action: NONE) {
          messagesConnection(first: 1) @required(action: NONE) {
            edges @required(action: NONE) {
              node {
                ...ConversationMessage_message
              }
            }
          }
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders partner message", () => {
    renderWithRelay({
      Message: () => ({
        createdAt: "2023-01-05T21:04:30+01:00",
        body: "Hello collector",
        from: { name: "Shared Partner" },
      }),
    })

    expect(screen.getByText("Hello collector")).toBeInTheDocument()
    expect(screen.queryByText("Shared Partner")).not.toBeInTheDocument()
  })

  it("renders collector message", () => {
    renderWithRelay({
      Message: () => ({
        createdAt: "2023-01-05T21:03:30+01:00",
        body: "Hello gallery",
        isFromUser: true,
        from: { name: "Collector Collectorson" },
      }),
    })

    expect(screen.getByText("Hello gallery")).toBeInTheDocument()
    expect(screen.getByText("Collector Collectorson")).toBeInTheDocument()
  })

  it("renders default message for non-available messages", () => {
    renderWithRelay({
      Message: () => ({
        createdAt: "2023-01-05T21:03:30+01:00",
        body: "",
        isFromUser: true,
        from: { name: "Collector Collectorson" },
      }),
    })

    expect(
      screen.getByText("This message is no longer available.")
    ).toBeInTheDocument()
    expect(screen.getByText("Collector Collectorson")).toBeInTheDocument()
  })

  it("renders attached images", () => {
    renderWithRelay({
      Message: () => ({
        createdAt: "2023-01-05T21:04:30+00:00",
        body: "Attached you'll find an image",
        isFromUser: false,
        attachments: [
          {
            contentType: "image/png",
            downloadURL: "https://image.png",
          },
        ],
      }),
    })

    expect(screen.getByAltText("Attached image")).toBeInTheDocument()
    expect(screen.getByAltText("Attached image")).toHaveAttribute(
      "src",
      "https://image.png"
    )
  })

  it("renders attached files", () => {
    renderWithRelay({
      Message: () => ({
        createdAt: "2023-01-05T21:04:30+00:00",
        body: "Attached you'll find a pdf",
        isFromUser: false,
        attachments: [
          {
            contentType: "application/pdf",
            downloadURL: "https://document.pdf",
            fileName: "attachment.pdf",
          },
        ],
      }),
    })

    expect(screen.getByText("attachment.pdf")).toBeInTheDocument()
  })
})
