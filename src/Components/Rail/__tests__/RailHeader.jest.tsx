import { RailHeaderTitle } from "Components/Rail/RailHeader"
import { render } from "@testing-library/react"

describe("RailHeaderTitle", () => {
  it("returns the text with no viewAllHref", () => {
    const { container } = render(<RailHeaderTitle title="Awesome Auction" />)
    expect(container.innerHTML).toEqual("Awesome Auction")
  })

  it("returns a RouterLink with a viewAllHref", () => {
    const { container } = render(
      <RailHeaderTitle
        title="Awesome Auction"
        viewAllHref="/auction/awesome-auction"
      />
    )
    expect(container.innerHTML).toContain('<a href="/auction/awesome-auction"')
    expect(container.innerHTML).toContain("Awesome Auction")
  })
})
