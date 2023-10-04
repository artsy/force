import { render, screen } from "@testing-library/react"
import { StackedImageLayout } from "Apps/CollectorProfile/Routes/Saves/Components/Images/StackedImageLayout"

describe("StackedImageLayout", () => {
  it("should render all passed images", () => {
    render(
      <StackedImageLayout imageURLs={["url-1", "url-2", "url-3", "url-4"]} />
    )

    expect(screen.getAllByAltText("")).toHaveLength(4)
  })

  it("should render image placeholders if nothing is passed", () => {
    render(<StackedImageLayout imageURLs={[]} />)

    expect(screen.getAllByLabelText("Image placeholder")).toHaveLength(4)
  })

  it("should render image placeholders and images", () => {
    render(<StackedImageLayout imageURLs={["url-1", null, null, "url-4"]} />)

    expect(screen.getAllByLabelText("Image placeholder")).toHaveLength(2)
    expect(screen.getAllByAltText("")).toHaveLength(2)
  })
})
