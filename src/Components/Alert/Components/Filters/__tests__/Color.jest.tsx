import { AlertProvider } from "Components/Alert/AlertProvider"
import { Color } from "Components/Alert/Components/Filters/Color"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("ColorFilter", () => {
  let alertContext

  const ColorFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Color />
  }

  const getWrapper = (_contextProps = {}, initialCriteria = {}) => {
    return render(
      <AlertProvider initialCriteria={initialCriteria}>
        <ColorFilterTestComponent />
      </AlertProvider>,
    )
  }

  it("displays all Colors", () => {
    getWrapper()

    expect(screen.getAllByRole("checkbox")).toHaveLength(10)

    expect(screen.getByText("Red")).toBeInTheDocument()
  })

  it("selects colors and only updates alert context", () => {
    getWrapper()

    fireEvent.click(screen.getAllByRole("checkbox")[0])

    expect(alertContext.state.criteria.colors).toEqual(["red"])
  })
})
