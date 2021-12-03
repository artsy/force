import { render, screen, fireEvent } from "@testing-library/react"
import { ArtworkFiltersState } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { SavedSearchAttributes } from "v2/Components/ArtworkFilter/SavedSearch/types"
import {
  FilterPill,
  FilterPillsContextProvider,
} from "v2/Components/ArtworkFilter/SavedSearch/Utils/FilterPillsContext"
import { ExtractProps } from "v2/Utils/ExtractProps"
import { Breakpoint } from "v2/Utils/Responsive"
import { SavedSearchAlertModal } from "../SavedSearchAlertModal"

const formInitialValues = {
  name: "",
  email: true,
  push: false,
}

const savedSearchProps: SavedSearchAttributes = {
  type: "artist",
  id: "test-artist-id",
  name: "Test Artist",
  slug: "test-artist-slug",
}

const mockedPills: FilterPill[] = [
  {
    isDefault: true,
    name: "test-artist-slug",
    displayName: "Test Artist",
  },
  {
    filterName: "attributionClass",
    name: "open-edition",
    displayName: "Open Edition",
  },
  {
    filterName: "priceRange",
    name: "25000-50000",
    displayName: "$25,000-$50,000",
  },
]

const onCloseMock = jest.fn()
const onCompleteMock = jest.fn()

describe("SavedSearchAlertModal", () => {
  const renderModal = ({
    props = {},
  }: {
    breakpoint?: Breakpoint
    filters?: ArtworkFiltersState
    props?: Partial<ExtractProps<typeof SavedSearchAlertModal>>
  }) => {
    render(
      <FilterPillsContextProvider pills={mockedPills}>
        <SavedSearchAlertModal
          visible
          initialValues={formInitialValues}
          savedSearchAttributes={savedSearchProps}
          onClose={onCloseMock}
          onComplete={onCompleteMock}
          {...props}
        />
      </FilterPillsContextProvider>
    )
  }

  it("is not rendered when visible=false", () => {
    renderModal({ props: { visible: false } })
    expect(screen.queryByText("Name")).not.toBeInTheDocument()
    expect(screen.queryByText("Filters")).not.toBeInTheDocument()
    expect(screen.queryByText("Test Artist")).not.toBeInTheDocument()
    expect(screen.queryByText("Open Edition")).not.toBeInTheDocument()
    expect(screen.queryByText("$25,000-$50,000")).not.toBeInTheDocument()
    expect(screen.queryByText("Email Alerts")).not.toBeInTheDocument()
    expect(screen.queryByText("Mobile Alerts")).not.toBeInTheDocument()
    expect(screen.queryByText("Save Alert")).not.toBeInTheDocument()
  })

  it("renders correctly", () => {
    renderModal({})
    expect(screen.getByText("Name")).toBeInTheDocument()
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

  it("name generated correctly", () => {
    renderModal({})
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Test Artist • 3 filters"
    )
  })

  it("email value changes correctly", () => {
    renderModal({})
    expect(screen.getAllByRole("checkbox")[0]).toBeChecked()
    fireEvent.click(screen.getAllByRole("checkbox")[0])
    expect(screen.getAllByRole("checkbox")[0]).not.toBeChecked()
  })

  it("push value changes correctly", () => {
    renderModal({})
    expect(screen.getAllByRole("checkbox")[1]).not.toBeChecked()
    fireEvent.click(screen.getAllByRole("checkbox")[1])
    expect(screen.getAllByRole("checkbox")[1]).toBeChecked()
  })
})
