import { AlertProvider } from "Components/Alert/AlertProvider"
import { WaysToBuy } from "Components/Alert/Components/Filters/WaysToBuy"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("WaysToBuyFilter", () => {
  let alertContext

  const WaysToBuyFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <WaysToBuy />
  }

  const getWrapper = (_contextProps = {}, initialCriteria = {}) => {
    return render(
      <AlertProvider initialCriteria={initialCriteria}>
        <WaysToBuyFilterTestComponent />
      </AlertProvider>
    )
  }

  it("displays all Ways To Buy", () => {
    getWrapper()

    expect(screen.getAllByRole("checkbox")).toHaveLength(4)

    expect(screen.getByText("Purchase")).toBeInTheDocument()
  })

  it("selects ways to buy and only updates alert context", () => {
    getWrapper()

    fireEvent.click(screen.getAllByRole("checkbox")[0])

    expect(alertContext.state.criteria.acquireable).toEqual(true)
  })
})
