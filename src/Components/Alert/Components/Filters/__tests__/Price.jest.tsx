import { fireEvent, render, screen } from "@testing-library/react"
import {
  AlertProvider,
  useAlertContext,
} from "Components/Alert/Hooks/useAlertContext"
import {
  ArtworkFilterContextProvider,
  useArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { Price } from "Components/Alert/Components/Filters/Price"

describe("PriceFilter", () => {
  let filterContext
  let alertContext

  const PriceFilterTestComponent = () => {
    filterContext = useArtworkFilterContext()
    alertContext = useAlertContext()

    return <Price />
  }

  const renderPriceRangeFilter = (contextProps = {}, initialCriteria = {}) => {
    return render(
      <ArtworkFilterContextProvider {...contextProps}>
        <AlertProvider initialCriteria={initialCriteria}>
          <PriceFilterTestComponent />
        </AlertProvider>
      </ArtworkFilterContextProvider>
    )
  }

  it("sets price range and only updates alert context", () => {
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 1000 },
    })
    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 10000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("1000-10000")
    expect(filterContext.filters.priceRange).toEqual("*-*")
  })

  it("sets only max price value", () => {
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Max price")[1], {
      target: { valueAsNumber: 10000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("*-10000")
  })

  it("sets only min price value", () => {
    renderPriceRangeFilter()

    fireEvent.input(screen.queryAllByLabelText("Min price")[1], {
      target: { valueAsNumber: 1000 },
    })

    expect(alertContext.state.criteria.priceRange).toEqual("1000-*")
  })
})
