import { Text } from "@artsy/palette"
import { InfoSection } from "Components/InfoSection"
import { render, screen } from "@testing-library/react"

describe("InfoSection", () => {
  it("shows plain text", () => {
    const { container } = render(
      <InfoSection info={"<strong>Info example</strong>"} type="text" />,
    )
    expect(container.textContent).toEqual("<strong>Info example</strong>")
  })

  it("shows html", () => {
    render(<InfoSection info={"<strong>Info example</strong>"} type="html" />)
    expect(screen.getByText("Info example")).toBeInTheDocument()
  })

  it("shows passed JSX", () => {
    render(
      <InfoSection
        info={
          <>
            <Text>Info item</Text>
            <Text>Another item</Text>
          </>
        }
      />,
    )
    expect(screen.getByText("Info item")).toBeInTheDocument()
    expect(screen.getByText("Another item")).toBeInTheDocument()
  })

  it("shows label", () => {
    render(<InfoSection info={"Info example"} type="text" label="About:" />)
    expect(screen.getByText("About:")).toBeInTheDocument()
  })
})
