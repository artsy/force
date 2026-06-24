import { ContextModule } from "@artsy/cohesion"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { emptyAddress } from "Components/Address/utils"
import { Formik } from "formik"
import { useTracking } from "react-tracking"

// Replace AddressAutocompleteInput with a stub: a plain input that mirrors
// the field semantics, plus a button that fires `onSelect` with a fixture
// address. This lets us drive the autocomplete selection deterministically
// without hitting Smarty or wiring up suggestion UI.
jest.mock("Components/Address/AddressAutocompleteInput", () => ({
  AddressAutocompleteInput: ({ name, value, onChange, onSelect }: any) => (
    <div>
      <input
        aria-label="Street address"
        name={name}
        value={value || ""}
        onChange={onChange}
        data-testid="autocomplete-input"
      />
      <button
        type="button"
        data-testid="select-autocomplete"
        onClick={() =>
          onSelect(
            {
              address: {
                addressLine1: "123 Test St",
                addressLine2: "",
                city: "Test City",
                region: "TS",
                postalCode: "12345",
                country: "US",
              },
            },
            0,
          )
        }
      >
        Select suggestion
      </button>
    </div>
  ),
}))

const mockTrackEvent = jest.fn()
;(useTracking as jest.Mock).mockImplementation(() => ({
  trackEvent: mockTrackEvent,
}))

const renderForm = () =>
  render(
    <Formik
      onSubmit={jest.fn()}
      initialValues={{ address: { ...emptyAddress, country: "US" } }}
    >
      <AddressFormFields contextModule={ContextModule.ordersFulfillment} />
    </Formik>,
  )

describe("AddressFormFields — editedAutocompletedAddress tracking", () => {
  beforeEach(() => {
    mockTrackEvent.mockClear()
  })

  it("fires editedAutocompletedAddress on the first edit after a suggestion is selected", async () => {
    renderForm()

    await userEvent.click(screen.getByTestId("select-autocomplete"))

    const city = screen.getByLabelText("City")
    await userEvent.type(city, "X")

    expect(mockTrackEvent).toHaveBeenCalledWith({
      action: "editedAutocompletedAddress",
      context_module: ContextModule.ordersFulfillment,
      context_owner_type: undefined,
      context_owner_id: "",
      field: "city",
      country: "US",
    })
  })

  it("does not fire when the user edits a field without first selecting a suggestion", async () => {
    renderForm()

    const city = screen.getByLabelText("City")
    await userEvent.type(city, "X")

    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: "editedAutocompletedAddress" }),
    )
  })

  it("fires only once across multiple edits after a single selection", async () => {
    renderForm()

    await userEvent.click(screen.getByTestId("select-autocomplete"))

    await userEvent.type(screen.getByLabelText("City"), "X")
    await userEvent.type(
      screen.getByLabelText("State, region or province"),
      "Y",
    )
    await userEvent.type(screen.getByLabelText("ZIP/Postal code"), "Z")

    const editEvents = mockTrackEvent.mock.calls.filter(
      ([event]) => event.action === "editedAutocompletedAddress",
    )
    expect(editEvents).toHaveLength(1)
    expect(editEvents[0][0].field).toBe("city")
  })

  it("re-enabled after a second selection so a later edit fires again", async () => {
    renderForm()

    await userEvent.click(screen.getByTestId("select-autocomplete"))
    await userEvent.type(screen.getByLabelText("City"), "X")
    await userEvent.click(screen.getByTestId("select-autocomplete"))
    await userEvent.type(
      screen.getByLabelText("State, region or province"),
      "Y",
    )

    const editEvents = mockTrackEvent.mock.calls.filter(
      ([event]) => event.action === "editedAutocompletedAddress",
    )
    expect(editEvents).toHaveLength(2)
    expect(editEvents.map(([e]) => e.field)).toEqual(["city", "region"])
  })

  it("does not fire when the user edits the `name` field after a selection", async () => {
    renderForm()

    await userEvent.click(screen.getByTestId("select-autocomplete"))
    await userEvent.type(screen.getByLabelText("Full name"), "Jane")

    expect(mockTrackEvent).not.toHaveBeenCalledWith(
      expect.objectContaining({ action: "editedAutocompletedAddress" }),
    )
  })
})
