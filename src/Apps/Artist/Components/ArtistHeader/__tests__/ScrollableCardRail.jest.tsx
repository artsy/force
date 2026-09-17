import { fireEvent, render, screen } from "@testing-library/react"
import { ScrollableCardRail } from "Apps/Artist/Components/ArtistHeader/ScrollableCardRail"
import { MockBoot } from "DevTools/MockBoot"

const makeCards = (count: number) => {
  return Array.from({ length: count }, (_, index) => (
    <div key={index}>Card {index}</div>
  ))
}

const renderRail = (count: number) => {
  const { container } = render(
    <MockBoot>
      <ScrollableCardRail itemsLabel="cards">
        {makeCards(count)}
      </ScrollableCardRail>
    </MockBoot>,
  )

  const viewport = container.querySelector("ul")?.parentElement as HTMLElement

  return { container, viewport }
}

// jsdom never computes real layout, so scrollWidth/clientWidth are always
// 0 — these tests fake realistic scroll metrics directly on the underlying
// element (the same node the component reads from) and fire a scroll
// event to trigger the component's listener, since setting properties via
// defineProperty doesn't dispatch one on its own.
const setScrollMetrics = (
  element: HTMLElement,
  metrics: { scrollLeft: number; scrollWidth: number; clientWidth: number },
) => {
  Object.entries(metrics).forEach(([key, value]) => {
    Object.defineProperty(element, key, {
      value,
      writable: true,
      configurable: true,
    })
  })
}

describe("ScrollableCardRail", () => {
  it("renders each child as its own cell with a flat 10px gap between them", () => {
    const { container } = renderRail(2)

    const cells = container.querySelectorAll("li")
    expect(cells).toHaveLength(2)
    // Swiper's own default is a responsive [10px, 20px] gap — this
    // flattens it to a consistent 10px instead, and the last cell keeps
    // no trailing padding.
    expect(cells[0]).toHaveStyle({ paddingRight: "10px" })
    expect(cells[1]).not.toHaveStyle({ paddingRight: "10px" })
  })

  describe("navigation", () => {
    it("disables the previous button and enables the next button when there is more to scroll", () => {
      const { viewport } = renderRail(3)

      setScrollMetrics(viewport, {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      expect(
        screen.getByRole("button", { name: "See previous cards" }),
      ).toBeDisabled()
      expect(
        screen.getByRole("button", { name: "See more cards" }),
      ).toBeEnabled()
    })

    it("enables the previous button and disables the next button once scrolled to the end", () => {
      const { viewport } = renderRail(3)

      setScrollMetrics(viewport, {
        scrollLeft: 700,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      expect(
        screen.getByRole("button", { name: "See previous cards" }),
      ).toBeEnabled()
      expect(
        screen.getByRole("button", { name: "See more cards" }),
      ).toBeDisabled()
    })

    it("scrolls the viewport by one page when the next button is clicked", () => {
      const { viewport } = renderRail(3)

      setScrollMetrics(viewport, {
        scrollLeft: 0,
        scrollWidth: 1000,
        clientWidth: 300,
      })
      fireEvent.scroll(viewport)

      // jsdom doesn't implement scrollBy at all, so there's nothing for
      // jest.spyOn to wrap — assign a stub directly instead.
      const scrollBySpy = jest.fn()
      viewport.scrollBy = scrollBySpy

      fireEvent.click(screen.getByRole("button", { name: "See more cards" }))

      expect(scrollBySpy).toHaveBeenCalledWith({ left: 300 })
    })
  })

  describe("progress indicator", () => {
    it("renders the scroll progress bar", () => {
      renderRail(3)

      expect(screen.getByRole("scrollbar")).toBeInTheDocument()
    })
  })
})
