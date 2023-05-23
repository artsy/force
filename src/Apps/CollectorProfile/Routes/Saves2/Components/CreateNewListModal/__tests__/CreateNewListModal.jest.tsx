import { OwnerType } from "@artsy/cohesion"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import {
  CreateNewListModalContainer,
  CreateNewListModalContainerProps,
} from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/CreateNewListModal"
import { AnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { useTracking } from "react-tracking"

jest.mock("Utils/Hooks/useMutation")

const mockUseMutation = useMutation as jest.Mock
const mockUseTracking = useTracking as jest.Mock
const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()
const submitMutation = jest.fn()
const trackEvent = jest.fn()

describe("CreateNewListModal", () => {
  beforeEach(() => {
    mockUseMutation.mockImplementation(() => {
      return { submitMutation }
    })

    mockUseTracking.mockImplementation(() => ({
      trackEvent,
    }))
  })

  afterEach(() => {
    submitMutation.mockClear()
  })

  const TestComponent = (props: Partial<CreateNewListModalContainerProps>) => {
    return (
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: "page-owner-id",
          contextPageOwnerSlug: "page-owner-slug",
          contextPageOwnerType: OwnerType.saves,
        }}
      >
        <CreateNewListModalContainer
          {...props}
          visible={props.visible ?? true}
          onClose={props.onClose ?? onCloseMock}
          onComplete={props.onComplete ?? onCompleteMock}
        />
      </AnalyticsContext.Provider>
    )
  }

  it("is not rendered when visible=false", () => {
    render(<TestComponent visible={false} />)
    expect(screen.queryByTestId("CreateNewList")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    render(<TestComponent />)

    expect(screen.getByTestId("CreateNewList")).toBeInTheDocument()
    expect(screen.getByText("Create a new list")).toBeInTheDocument()
    expect(screen.getByText("Name your list")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "E.g. Photography, Warhol, etc."
    )
    expect(screen.getByText("40 characters remaining")).toBeInTheDocument()
  })

  it("create button is disabled when name is empty", () => {
    render(<TestComponent />)
    const createButton = screen.getAllByRole("button", {
      name: "Create List",
    })[0]

    expect(createButton).toBeDisabled()
  })

  it("create button is enabled when name is not empty / counter works", () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "B&W photography",
      },
    })

    expect(screen.getByText("25 characters remaining")).toBeInTheDocument()

    const createButton = screen.getAllByRole("button", {
      name: "Create List",
    })[0]
    expect(createButton).toBeEnabled()
  })

  it("clears entered data when modal is closed", () => {
    const { rerender } = render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "B&W photography",
      },
    })

    rerender(<TestComponent visible={false} />)
    rerender(<TestComponent visible={true} />)

    expect(screen.getByRole("textbox")).toHaveValue("")
  })

  it("displays artwork info", () => {
    render(
      <TestComponent
        artwork={{
          title: "Artwork Title",
          year: "2023",
          artistNames: "Banksy",
          imageURL: null,
        }}
      />
    )

    expect(screen.getByText(/Banksy/)).toBeInTheDocument()
    expect(screen.getByText(/Artwork Title/)).toBeInTheDocument()
    expect(screen.getByText(/2023/)).toBeInTheDocument()
  })

  it("track event when artwork list was created", async () => {
    const artworkList = {
      internalID: "artwork-list-id",
      name: "Artwork List Name",
    }

    submitMutation.mockImplementation(() => ({
      createCollection: {
        responseOrError: {
          collection: artworkList,
        },
      },
    }))

    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: artworkList.name,
      },
    })

    fireEvent.click(screen.getByText("Create List"))

    await waitFor(() =>
      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "createdArtworkList",
        context_owner_id: "page-owner-id",
        context_owner_slug: "page-owner-slug",
        context_owner_type: "saves",
        owner_id: artworkList.internalID,
      })
    )
  })

  it("trims extra whitespace", async () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "  Foo Bar  ",
      },
    })

    fireEvent.click(screen.getByText("Create List"))

    await waitFor(() =>
      expect(submitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              name: "Foo Bar",
            },
          },
        })
      )
    )
  })

  it("prevents empty names", async () => {
    render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "   ",
      },
    })

    fireEvent.click(screen.getByText("Create List"))

    await waitFor(() => {
      expect(screen.getByText("Name cannot be empty")).toBeInTheDocument()
    })
  })
})
