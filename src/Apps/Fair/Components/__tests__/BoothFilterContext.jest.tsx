import {
  BoothFilterContextProvider,
  initialBoothFilterState,
  useBoothsFilterContext,
} from "Apps/Fair/Components/BoothFilterContext"
import { render } from "@testing-library/react"
import { act } from "react"

describe("BoothFilterContext", () => {
  let context: ReturnType<typeof useBoothsFilterContext>

  const getWrapper = (props = {}) => {
    return render(
      <BoothFilterContextProvider {...props}>
        <TestComponent />
      </BoothFilterContextProvider>,
    )
  }

  const TestComponent = () => {
    context = useBoothsFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialBoothFilterState)
  })

  describe("behaviors", () => {
    it("#onFilterClick", () => {
      const spy = jest.fn()
      getWrapper({ onFilterClick: spy })
      context.onFilterClick!("sort", "FEATURED_DESC", initialBoothFilterState)
      expect(spy).toHaveBeenCalledWith(
        "sort",
        "FEATURED_DESC",
        initialBoothFilterState,
      )
    })

    it("#setFilter", () => {
      getWrapper()
      act(() => {
        context.setFilter("sort", "NAME_ASC")
      })
      expect(context.filters?.sort).toEqual("NAME_ASC")
    })
  })
})
