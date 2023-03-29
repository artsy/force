import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import { ConversationAttachmentsList } from "Apps/Conversations2/Routes/Conversation/Components/ConversationAttachmentsList"
import { Attachment } from "Apps/Conversations2/hooks/useAttachments"

const attachments = [
  {
    id: "1",
    name: "File 1.pdf",
    size: "100 MB",
    url: "url",
    type: "application/pdf",
  },
  {
    id: "2",
    name: "File 2.jpg",
    size: "200 MB",
    url: "url",
    type: "image/jpg",
  },
] as Attachment[]

const removeAttachment = jest.fn()

describe("ConversationAttachmentsList", () => {
  it("renders correctly with attachments", () => {
    render(
      <ConversationAttachmentsList
        attachments={attachments}
        onRemoveAttachment={removeAttachment}
      />
    )

    expect(screen.getByText("File 1.pdf")).toBeInTheDocument()
    expect(screen.getByText("(100 MB)")).toBeInTheDocument()
    expect(screen.getByText("File 2.jpg")).toBeInTheDocument()
    expect(screen.getByText("(200 MB)")).toBeInTheDocument()
    expect(screen.queryByTestId("attachment-spinner")).not.toBeInTheDocument()
  })

  it("renders correctly without attachments", () => {
    render(
      <ConversationAttachmentsList onRemoveAttachment={removeAttachment} />
    )

    expect(screen.queryByText("File 1.pdf")).not.toBeInTheDocument()
  })

  it("triggers an update in the parent when removing an attachment", async () => {
    render(
      <ConversationAttachmentsList
        attachments={attachments}
        onRemoveAttachment={removeAttachment}
      />
    )

    const removeButtons = await screen.findAllByTestId("remove-icon")
    fireEvent.click(removeButtons[1])

    expect(removeAttachment).toHaveBeenCalled()
  })

  it("shows the loading spinner if URL is not given", () => {
    render(
      <ConversationAttachmentsList
        attachments={[{ ...attachments[0], url: undefined }]}
        onRemoveAttachment={removeAttachment}
      />
    )

    expect(screen.getByTestId("attachment-spinner")).toBeInTheDocument()
  })
})
