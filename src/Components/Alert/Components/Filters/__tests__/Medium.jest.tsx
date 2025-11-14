import { AlertProvider } from "Components/Alert/AlertProvider"
import { Medium } from "Components/Alert/Components/Filters/Medium"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import { fireEvent, render, screen } from "@testing-library/react"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

describe("MediumFilter", () => {
  let alertContext

  const MediumFilterTestComponent = () => {
    alertContext = useAlertContext()

    return <Medium />
  }

  const getWrapper = (_contextProps = {}, initialCriteria = {}) => {
    return render(
      <AlertProvider initialCriteria={initialCriteria}>
        <MediumFilterTestComponent />
      </AlertProvider>,
    )
  }

  it("displays all mediums", () => {
    getWrapper()

    expect(screen.getAllByRole("checkbox")).toHaveLength(15)

    expect(screen.getByText("Painting")).toBeInTheDocument()
  })

  it("selects mediums and only updates alert context", () => {
    getWrapper()

    fireEvent.click(screen.getAllByRole("checkbox")[0])

    expect(alertContext.state.criteria.additionalGeneIDs).toEqual(["painting"])
  })
})
