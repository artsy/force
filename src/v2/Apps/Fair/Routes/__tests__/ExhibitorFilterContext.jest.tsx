import { mount } from "enzyme"
import React from "react"
import { act } from "react-dom/test-utils"
import {
  ExhibitorFilterContextProvider,
  initialExhibitorFilterState,
  useExhibitorsFilterContext,
} from "../ExhibitorFilterContext"

describe("ExhibitorFilterContext", () => {
  let context: ReturnType<typeof useExhibitorsFilterContext>

  const getWrapper = (props = {}) => {
    return mount(
      <ExhibitorFilterContextProvider {...props}>
        <TestComponent />
      </ExhibitorFilterContextProvider>
    )
  }

  const TestComponent = () => {
    context = useExhibitorsFilterContext()
    return null
  }

  it("boots with default filters", async () => {
    getWrapper()
    expect(context.filters).toEqual(initialExhibitorFilterState)
  })

  describe("behaviors", () => {
    it("#onFilterClick", () => {
      const spy = jest.fn()
      getWrapper({ onFilterClick: spy })
      context.onFilterClick!(
        "sort",
        "FAETURED_DESC",
        initialExhibitorFilterState
      )
      expect(spy).toHaveBeenCalledWith(
        "sort",
        "FAETURED_DESC",
        initialExhibitorFilterState
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
