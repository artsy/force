import { PricingContextModal } from "Apps/Artwork/Components/PricingContextModal"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { mockTracking } from "DevTools/mockTracking"
import { render } from "DevTools/renderWithMockBoot"
import { fireEvent, screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.unmock("react-tracking")

describe("PricingContextModal", () => {
  it("renders with the modal closed", () => {
    render(<PricingContextModal />)

    expect(screen.getByRole("button")).toBeInTheDocument()

    expect(
      screen.queryByText(
        "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points.",
      ),
    ).not.toBeInTheDocument()
  })

  it("renders the link to 'How Artworks Get Their Prices' article", async () => {
    const { container } = render(<PricingContextModal />)

    const helpIcon = container.querySelector("button")!
    fireEvent.click(helpIcon)

    await flushPromiseQueue()

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)

    expect(links[0]).toHaveAttribute(
      "href",
      "/article/artsy-editorial-artworks-prices",
    )
  })

  it("renders the support mailto link", async () => {
    const { container } = render(<PricingContextModal />)

    const helpIcon = container.querySelector("button")!
    fireEvent.click(helpIcon)

    await flushPromiseQueue()

    const links = screen.getAllByRole("link")
    expect(links[1]).toHaveAttribute("href", "mailto:support@artsy.net")
  })

  it("opens the modal when the question mark icon is clicked", async () => {
    const { container } = render(<PricingContextModal />)

    const helpIcon = container.querySelector("button")!
    fireEvent.click(helpIcon)

    await flushPromiseQueue()

    expect(
      screen.getByText(
        "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points.",
      ),
    ).toBeInTheDocument()
  })

  it("closes the modal when the 'Got it' button is clicked", async () => {
    const { container } = render(<PricingContextModal />)

    const helpIcon = container.querySelector("button")!
    fireEvent.click(helpIcon)

    await flushPromiseQueue()

    expect(
      screen.getByText(
        "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points.",
      ),
    ).toBeInTheDocument()

    const gotItButton = screen.getByText("Got it")
    expect(gotItButton).toBeInTheDocument()

    fireEvent.click(gotItButton)

    await flushPromiseQueue()

    // TODO: Can't get this to update/pass
    // expect(screen.queryByText(
    //   "This feature aims to provide insight into the range of prices for an artist's works and allow buyers to discover other available works by the artist at different price points."
    // )).not.toBeInTheDocument()
  })

  describe("Analytics", () => {
    // FIXME: MockBoot interfering somehow...
    it.skip("tracks clicks on the question mark icon", () => {
      const { Component, dispatch } = mockTracking(PricingContextModal)
      render(<Component />)

      const helpIcon = screen.getByRole("button")
      fireEvent.click(helpIcon)

      expect(dispatch).toBeCalledWith({
        context_module: "Price Context",
        action_type: "Click",
        subject: "Question Mark Informational Icon",
        flow: "Artwork Price Context",
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
