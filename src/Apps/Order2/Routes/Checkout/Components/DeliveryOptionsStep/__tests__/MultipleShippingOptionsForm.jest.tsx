import { render, screen } from "@testing-library/react"
import { MultipleShippingOptionsForm } from "../MultipleShippingOptionsForm"

describe("MultipleShippingOptionsForm", () => {
  const mockOnSelectOption = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockOnSelectOption.mockResolvedValue(true)
  })

  it("syncs selection when options prop changes (address change scenario)", () => {
    const initialOptions = [
      {
        type: "ARTSY_STANDARD",
        amount: { display: "$25.00", minor: 2500, currencyCode: "USD" },
        selected: true,
        shippingQuoteId: "quote-1",
      },
      {
        type: "ARTSY_EXPRESS",
        amount: { display: "$50.00", minor: 5000, currencyCode: "USD" },
        selected: false,
        shippingQuoteId: "quote-2",
      },
    ]

    const { rerender } = render(
      <MultipleShippingOptionsForm
        options={initialOptions}
        onSelectOption={mockOnSelectOption}
      />,
    )

    // Verify initial state: Standard is selected
    let standardRadio = screen.getByRole("radio", { name: /Standard/ })
    let expressRadio = screen.getByRole("radio", { name: /Express/ })
    expect(standardRadio).toBeChecked()
    expect(standardRadio.closest("label")).toHaveStyle(
      "background-color: mono5",
    )

    // Simulate address change: new quotes arrive with Express now selected
    const newOptions = [
      {
        type: "ARTSY_STANDARD",
        amount: { display: "$30.00", minor: 3000, currencyCode: "USD" },
        selected: false,
        shippingQuoteId: "quote-3",
      },
      {
        type: "ARTSY_EXPRESS",
        amount: { display: "$60.00", minor: 6000, currencyCode: "USD" },
        selected: true,
        shippingQuoteId: "quote-4",
      },
    ]

    rerender(
      <MultipleShippingOptionsForm
        options={newOptions}
        onSelectOption={mockOnSelectOption}
      />,
    )

    // Re-query after rerender to get fresh element references
    standardRadio = screen.getByRole("radio", { name: /Standard/ })
    expressRadio = screen.getByRole("radio", { name: /Express/ })

    // After rerender with new options, Express should be selected
    // Both radio button and background highlight should match
    expect(expressRadio).toBeChecked()
    expect(standardRadio).not.toBeChecked()
    expect(expressRadio.closest("label")).toHaveStyle("background-color: mono5")
  })

  it("syncs background highlight when options update", () => {
    const initialOptions = [
      {
        type: "ARTSY_STANDARD",
        amount: { display: "$25.00", minor: 2500, currencyCode: "USD" },
        selected: false,
        shippingQuoteId: "quote-1",
      },
      {
        type: "ARTSY_EXPRESS",
        amount: { display: "$50.00", minor: 5000, currencyCode: "USD" },
        selected: true,
        shippingQuoteId: "quote-2",
      },
    ]

    const { rerender } = render(
      <MultipleShippingOptionsForm
        options={initialOptions}
        onSelectOption={mockOnSelectOption}
      />,
    )

    const expressRadio = screen.getByRole("radio", { name: /Express/ })
    expect(expressRadio).toBeChecked()

    // New options arrive with Standard selected
    const newOptions = [
      {
        type: "ARTSY_STANDARD",
        amount: { display: "$30.00", minor: 3000, currencyCode: "USD" },
        selected: true,
        shippingQuoteId: "quote-3",
      },
      {
        type: "ARTSY_EXPRESS",
        amount: { display: "$60.00", minor: 6000, currencyCode: "USD" },
        selected: false,
        shippingQuoteId: "quote-4",
      },
    ]

    rerender(
      <MultipleShippingOptionsForm
        options={newOptions}
        onSelectOption={mockOnSelectOption}
      />,
    )

    const standardRadio = screen.getByRole("radio", { name: /Standard/ })

    // Standard should now be checked with background highlight
    expect(standardRadio).toBeChecked()
    expect(expressRadio).not.toBeChecked()
    expect(standardRadio.closest("label")).toHaveStyle(
      "background-color: mono5",
    )
    expect(expressRadio.closest("label")).toHaveStyle("background-color: mono0")
  })
})
