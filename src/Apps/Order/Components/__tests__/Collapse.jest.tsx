import { Collapse } from "Apps/Order/Components/Collapse"
import { render, screen } from "@testing-library/react"

describe("Collapse", () => {
  it("is visible (height: auto) when open is true", () => {
    render(
      <Collapse open>The elegant spiral of the Nautilus shell, ...</Collapse>
    )
    const collapseDiv = screen.getByText(
      "The elegant spiral of the Nautilus shell, ..."
    )
    expect(collapseDiv).toHaveStyle({ height: "auto" })
  })

  it("is not visible (height: 0) when open is false", () => {
    render(
      <Collapse open={false}>The elegant spiral of the Nautilus ...</Collapse>
    )

    const collapseDiv = screen.getByText(
      "The elegant spiral of the Nautilus ..."
    )
    expect(collapseDiv).toHaveStyle({ height: "0px" })
  })
})
