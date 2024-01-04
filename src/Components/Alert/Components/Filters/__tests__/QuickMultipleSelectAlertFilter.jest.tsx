import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AlertContextProps } from "Components/Alert/AlertContext"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { QuickMultipleSelectAlertFilter } from "Components/Alert/Components/Filters/QuickMultipleSelectAlertFilter"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

describe(QuickMultipleSelectAlertFilter, () => {
  it("renders a label, description and options", () => {
    renderWithWrapper(
      <QuickMultipleSelectAlertFilter
        label="Custom Label"
        description="Custom description text"
        criteriaKey="colors"
        options={someOptions}
      />
    )

    expect(screen.getByText("Custom Label")).toBeInTheDocument()
    expect(screen.getByText("Custom description text")).toBeInTheDocument()
    expect(screen.getByText("Name 1")).toBeInTheDocument()
    expect(screen.getByText("Name 6")).toBeInTheDocument()
  })

  it("updates alert context when options are toggled", () => {
    renderWithWrapper(
      <QuickMultipleSelectAlertFilter
        label="Custom Label"
        criteriaKey="colors"
        options={someOptions}
      />
    )

    expect(screen.getByText("Custom Label")).toBeInTheDocument()
    expect(currentAlertContext().state.criteria.colors).toBeUndefined()

    // toggle on
    userEvent.click(screen.getByText("Name 1"))
    expect(currentAlertContext().state.criteria.colors).toEqual(["value-1"])

    // toggle off
    userEvent.click(screen.getByText("Name 1"))
    expect(currentAlertContext().state.criteria.colors).toEqual([])
  })

  it("can truncate and then expand the list of options", () => {
    renderWithWrapper(
      <QuickMultipleSelectAlertFilter
        label="Custom Label"
        description="Custom description text"
        criteriaKey="colors"
        options={someOptions}
        truncate={4}
      />
    )

    // truncate initially
    expect(screen.queryByText("Name 1")).toBeInTheDocument()
    expect(screen.queryByText("Name 4")).toBeInTheDocument()

    expect(screen.queryByText("Name 5")).not.toBeInTheDocument()
    expect(screen.queryByText("Name 6")).not.toBeInTheDocument()

    // expand by clicking "Show more"
    userEvent.click(screen.getByText("Show more"))
    expect(screen.queryByText("Name 5")).toBeInTheDocument()
    expect(screen.queryByText("Name 6")).toBeInTheDocument()

    // collapse by clicking "Hide"
    userEvent.click(screen.getByText("Hide"))
    expect(screen.queryByText("Name 5")).not.toBeInTheDocument()
    expect(screen.queryByText("Name 6")).not.toBeInTheDocument()
  })
})

// fixtures

const someOptions = [
  { name: "Name 1", value: "value-1" },
  { name: "Name 2", value: "value-2" },
  { name: "Name 3", value: "value-3" },
  { name: "Name 4", value: "value-4" },
  { name: "Name 5", value: "value-5" },
  { name: "Name 6", value: "value-6" },
]

// helpers

/**
 * Custom renderer with context and inspectable alert state
 */
const renderWithWrapper = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: Wrapper, ...options })

/**
 * Dumps the AlertContext to the DOM for inspection
 */
const AlertStateInspector = () => {
  const state = useAlertContext()
  return (
    <pre data-testid="alert-state-inspector">
      {JSON.stringify(state, null, 2)}
    </pre>
  )
}

/**
 * @returns An object representing the current state of the `AlertContext`
 */
function currentAlertContext(): AlertContextProps {
  let contextInspector: HTMLElement
  try {
    contextInspector = screen.getByTestId("alert-state-inspector")
  } catch (error) {
    if (error.name === "TestingLibraryElementError")
      throw new Error(
        `The currentAlertContext() helper function requires an <AlertStateInspector /> to be mounted in the current DOM.`
      )
  }
  return JSON.parse(contextInspector!.textContent!)
}

/**
 * Render a component, along with context and inspector
 */
const Wrapper = ({ children }) => {
  return (
    <AlertProvider>
      <AlertStateInspector />
      {children}
    </AlertProvider>
  )
}
