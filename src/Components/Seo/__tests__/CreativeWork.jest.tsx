import { CreativeWork } from "Components/Seo/CreativeWork"
import { render } from "@testing-library/react"
import { HeadProvider } from "react-head"

describe("CreativeWork", () => {
  const defaultProps = { data: {} }

  const renderComponent = (props = {}) => {
    return render(
      <HeadProvider>
        <CreativeWork {...defaultProps} {...props} />
      </HeadProvider>
    )
  }

  it("sets the schema type", () => {
    const data = { title: "Pretty Painting" }
    const props = { data }
    renderComponent(props)

    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@type": "CreativeWork"')
    expect(script?.textContent).toMatch('"title": "Pretty Painting"')
  })
})
