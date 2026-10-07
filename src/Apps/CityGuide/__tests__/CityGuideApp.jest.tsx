import { render, screen } from "@testing-library/react"
import { CityGuideApp } from "Apps/CityGuide/CityGuideApp"
import { cityGuideRoutes } from "Apps/CityGuide/cityGuideRoutes"
import { HeadProvider } from "react-head"

describe("CityGuideApp", () => {
  const renderApp = () => {
    return render(
      <HeadProvider>
        <CityGuideApp />
      </HeadProvider>,
    )
  }

  it("renders the headline, the QR code and the line under it", () => {
    renderApp()

    expect(
      screen.getByRole("heading", {
        name: /Plan your art day with City\s+Guide on the Artsy app\./,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByAltText("QR code to download the Artsy app"),
    ).toHaveAttribute("src", "/city-guide-on-app/assets/qr-flowcode.png")
    expect(
      screen.getByText(
        "To download the app, open your phone’s camera and point it at the QR code.",
      ),
    ).toBeInTheDocument()
  })

  it("renders the five phones in order", () => {
    renderApp()

    const phones = screen.getAllByRole("img", {
      name: (name, element) => {
        return element.getAttribute("src")?.includes("/assets/v3/") ?? false
      },
    })

    expect(phones.map(phone => phone.getAttribute("src"))).toEqual([
      "/city-guide-on-app/assets/v3/map.webp",
      "/city-guide-on-app/assets/v3/frieze-week-guide.webp",
      "/city-guide-on-app/assets/v3/city-guide.webp",
      "/city-guide-on-app/assets/v3/add-to-itinerary.webp",
      "/city-guide-on-app/assets/v3/itinerary.webp",
    ])
  })

  it("is not indexed", () => {
    renderApp()

    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    )
  })

  it("is mounted at /city-guide-on-app", () => {
    expect(cityGuideRoutes.map(route => route.path)).toEqual([
      "/city-guide-on-app",
    ])
  })
})
