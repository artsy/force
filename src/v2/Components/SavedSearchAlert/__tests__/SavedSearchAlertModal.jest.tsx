import { OwnerType } from "@artsy/cohesion"
import { render, screen, fireEvent } from "@testing-library/react"
import {
  ArtworkFilterContextProvider,
  ArtworkFiltersState,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import {
  SavedSearchAlertModalContainer,
  SavedSearchAlertFormContainerProps,
} from "../SavedSearchAlertModal"
import { SavedSearchEntity } from "../types"

const formInitialValues = {
  name: "",
  email: true,
  push: false,
}

const savedSearchEntity: SavedSearchEntity = {
  placeholder: "Test Artist",
  artists: [
    {
      id: "test-artist-id",
      name: "Test Artist",
      slug: "test-artist-slug",
    },
  ],
  analytics: {
    ownerType: OwnerType.artist,
  },
}

const defaultFilters: ArtworkFiltersState = {
  attributionClass: ["open edition"],
  priceRange: "25000-50000",
}

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

interface Props extends Partial<SavedSearchAlertFormContainerProps> {
  filters?: ArtworkFiltersState
}

describe("SavedSearchAlertModal", () => {
  const TestComponent = (props: Props) => {
    const { filters = defaultFilters, ...rest } = props

    return (
      <ArtworkFilterContextProvider filters={filters}>
        <SavedSearchAlertModalContainer
          visible
          initialValues={formInitialValues}
          entity={savedSearchEntity}
          onClose={onCloseMock}
          onComplete={onCompleteMock}
          {...rest}
        />
      </ArtworkFilterContextProvider>
    )
  }

  it("is not rendered when visible=false", () => {
    render(<TestComponent visible={false} />)
    expect(screen.queryByText("Alert Name")).not.toBeInTheDocument()
    expect(screen.queryByText("Filters")).not.toBeInTheDocument()
    expect(screen.queryByText("Test Artist")).not.toBeInTheDocument()
    expect(screen.queryByText("Open Edition")).not.toBeInTheDocument()
    expect(screen.queryByText("$25,000-$50,000")).not.toBeInTheDocument()
    expect(screen.queryByText("Email Alerts")).not.toBeInTheDocument()
    expect(screen.queryByText("Mobile Alerts")).not.toBeInTheDocument()
    expect(screen.queryByText("Save Alert")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    render(<TestComponent />)
    expect(screen.getByText("Alert Name")).toBeInTheDocument()
    expect(screen.getByText("Filters")).toBeInTheDocument()
    expect(screen.getByText("Test Artist")).toBeInTheDocument()
    expect(screen.getByText("Open Edition")).toBeInTheDocument()
    expect(screen.getByText("$25,000-$50,000")).toBeInTheDocument()
    expect(screen.getByText("Email Alerts")).toBeInTheDocument()
    expect(screen.getByText("Mobile Alerts")).toBeInTheDocument()
    expect(screen.getByText("Save Alert")).toBeInTheDocument()
    expect(screen.getByRole("textbox")).toHaveValue("")
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked()
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
  })

  it("alert name generated correctly", () => {
    render(<TestComponent />)
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Test Artist"
    )
  })

  it("email value changes correctly", () => {
    render(<TestComponent />)
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked()
    fireEvent.click(screen.getAllByRole("checkbox")[0])
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked()
  })

  it("push value changes correctly", () => {
    render(<TestComponent />)
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
    fireEvent.click(screen.getAllByRole("checkbox")[1])
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked()
  })

  it("saved alert button is disabled when no one notification option selected", () => {
    render(
      <TestComponent initialValues={{ ...formInitialValues, email: false }} />
    )
    const saveAlertButton = screen.getByRole("button", { name: "Save Alert" })

    expect(saveAlertButton).toBeDisabled()
  })

  it("saved alert button is enabled when at least one notification option selected", () => {
    render(<TestComponent />)

    expect(screen.getByText("Save Alert")).toBeEnabled()
  })

  it("clear entered data when modal is closed", () => {
    const { rerender } = render(<TestComponent />)

    fireEvent.change(screen.getByRole("textbox"), {
      target: {
        value: "New Name",
      },
    })
    fireEvent.click(screen.getAllByRole("checkbox")[0])
    fireEvent.click(screen.getAllByRole("checkbox")[1])

    expect(screen.getByRole("textbox")).toHaveValue("New Name")
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked()
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked()

    rerender(<TestComponent visible={false} />)
    rerender(<TestComponent visible={true} />)

    expect(screen.getByRole("textbox")).toHaveValue("")
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked()
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
  })
})
