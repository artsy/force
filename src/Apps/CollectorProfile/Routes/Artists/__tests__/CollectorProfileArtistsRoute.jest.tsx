import { render, screen } from "@testing-library/react"
import { CollectorProfileArtistsRoute } from "Apps/CollectorProfile/Routes/Artists/CollectorProfileArtistsRoute"
import { MockBoot } from "DevTools/MockBoot"

describe("CollectorProfileArtistsRoute", () => {
  it("renders correctly", () => {
    render(
      <MockBoot>
        <CollectorProfileArtistsRoute />
      </MockBoot>
    )

    expect(screen.getByText("Add Artist")).toBeInTheDocument()
  })
})
