import {
  CreateNewListModalWizard,
  CreateNewListModalWizardProps,
} from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModalWizard"
import { fireEvent, screen } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { render } from "DevTools/renderWithMockBoot"

jest.mock("System/Hooks/useSystemContext")
jest.mock("Utils/Hooks/useMutation")

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

describe("CreateNewListModalWizard", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockUseMutation = useMutation as jest.Mock
  const submitMutation = jest.fn()

  beforeEach(() => {
    submitMutation.mockImplementation(() => ({
      createCollection: {
        responseOrError: {
          __typename: "CreateCollectionSuccess",
          collection: {
            internalID: "3ea42c63-9518-4716-bc32-2f34e2e711f5",
            name: "Photography",
          },
        },
      },
    }))

    mockUseSystemContext.mockImplementation(() => {
      return { relayEnvironment: {} }
    })
    mockUseMutation.mockImplementation(() => {
      return {
        submitMutation,
      }
    })
  })

  afterEach(() => {
    submitMutation.mockClear()
  })

  const TestComponent = (props: Partial<CreateNewListModalWizardProps>) => {
    return (
      <CreateNewListModalWizard
        onClose={props.onClose ?? onCloseMock}
        onComplete={props.onComplete ?? onCompleteMock}
        savedArtworksCount={1}
      />
    )
  }

  it("renders CreateNewListModal if listName is empty", async () => {
    render(<TestComponent />)

    const title = await screen.findByText("Create a new list")
    expect(title).toBeInTheDocument()
  })

  it("renders AddArtworksModal if listName is not empty", async () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "Photography",
      },
    })

    const createButton = screen.getByRole("button", {
      name: /Create List/,
    })
    fireEvent.click(createButton)

    const title = await screen.findByText(
      "Photography created. Add saved works to the list."
    )
    expect(title).toBeInTheDocument()
  })
})
