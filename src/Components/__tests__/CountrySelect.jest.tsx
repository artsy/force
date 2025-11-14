import { CountrySelect } from "Components/CountrySelect"
import { fireEvent, render } from "@testing-library/react"

describe("CountrySelect", () => {
  // TODO: Chris, this test needs finishing.
  it.skip("triggers callback on change", done => {
    const { container } = render(
      <CountrySelect
        onSelect={() => {
          done()
        }}
      />,
    )

    const select = container.querySelector("select")!
    fireEvent.change(select)
  })
})
