import { CreateNewListModalWizard } from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/CreateNewListModalWizard"
import { fireEvent, screen } from "@testing-library/react"
import { useMutation } from "Utils/Hooks/useMutation"
import { useSystemContext } from "System/useSystemContext"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

jest.mock("System/useSystemContext")
jest.mock("Utils/Hooks/useMutation")
jest.unmock("react-relay")

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

describe("CreateNewListModalWizard", () => {
  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => {
      return (
        <CreateNewListModalWizard
          onClose={props.onClose ?? onCloseMock}
          onComplete={props.onComplete ?? onCompleteMock}
          {...props}
        />
      )
    },
    query: graphql`
      query CreateNewListModalWizard_Test_Query {
        me {
          collection(id: "saved-artwork") {
            artworksConnection {
              totalCount
            }
          }
        }
      }
    `,
  })

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

  it("renders CreateNewListModal if listName is empty", async () => {
    renderWithRelay({
      Me: () => ({
        collection: {
          artworksConnection: {
            totalCount: 1,
          },
        },
      }),
    })

    const title = await screen.findByText("Create a new list")
    expect(title).toBeInTheDocument()
  })

  it("renders AddArtworksModal if listName is not empty", async () => {
    renderWithRelay({
      Me: () => ({
        collection: {
          artworksConnection: {
            totalCount: 1,
          },
        },
      }),
    })

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
