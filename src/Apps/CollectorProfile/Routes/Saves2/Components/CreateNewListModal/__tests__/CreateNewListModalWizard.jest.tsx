import {
  CreateNewListModalWizard,
  CreateNewListModalWizardProps,
} from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/CreateNewListModalWizard"
import { fireEvent, render, screen } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSystemContext } from "System/useSystemContext"

jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMutation")

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

describe("CreateNewListModalWizard", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock

  beforeEach(() => {
    mockUseSystemContext.mockImplementation(() => {
      return { relayEnvironment: {} }
    })
    ;(useMutation as jest.Mock).mockImplementation(() => {
      return {
        submitMutation: () => {
          return Promise.resolve({
            createCollection: {
              responseOrError: {
                __typename: "CreateCollectionSuccess",
                collection: {
                  internalID: "3ea42c63-9518-4716-bc32-2f34e2e711f5",
                  name: "B&W Photography",
                },
              },
            },
          })
        },
      }
    })
  })

  const TestComponent = (props: Partial<CreateNewListModalWizardProps>) => {
    return (
      <CreateNewListModalWizard
        onClose={props.onClose ?? onCloseMock}
        onComplete={props.onComplete ?? onCompleteMock}
      />
    )
  }

  it("renders CreateNewListModal if listName is empty", () => {
    render(<TestComponent />)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
  })

  it("renders AddArtworksModal if listName is not empty", async () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "B&W photography",
      },
    })

    const createButton = screen.getByRole("button", {
      name: /Create List/,
    })
    fireEvent.click(createButton)

    expect(await screen.findByTestId("AddArtworksModal")).toBeInTheDocument()
  })
})
