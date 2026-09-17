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
