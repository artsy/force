import { fireEvent, render, screen } from "@testing-library/react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SearchByImageButton } from "../SearchByImageButton"

jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))

jest.mock("../SearchByImageModal", () => ({
  SearchByImageModal: () => {
    return <div>Artsy Lens modal</div>
  },
}))

describe("SearchByImageButton", () => {
  const mockUseSystemContext = useSystemContext as jest.Mock

  it("is hidden when the Artsy Lens feature flag is disabled", () => {
    mockUseSystemContext.mockReturnValue({
      featureFlags: { isEnabled: jest.fn(() => false) },
    })

    render(<SearchByImageButton />)

    expect(
      screen.queryByLabelText("Search by image with Artsy Lens"),
    ).not.toBeInTheDocument()
  })

  it("opens Artsy Lens when the feature flag is enabled", () => {
    mockUseSystemContext.mockReturnValue({
      featureFlags: { isEnabled: jest.fn(() => true) },
    })

    render(<SearchByImageButton />)

    fireEvent.click(screen.getByLabelText("Search by image with Artsy Lens"))

    expect(screen.getByText("Artsy Lens modal")).toBeInTheDocument()
  })
})
