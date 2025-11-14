import { Product } from "Components/Seo/Product"
import { render } from "@testing-library/react"
import { HeadProvider } from "react-head"

describe("Product", () => {
  const defaultProps = { data: {} }

  const renderComponent = (props = {}) => {
    return render(
      <HeadProvider>
        <Product {...defaultProps} {...props} />
      </HeadProvider>,
    )
  }

  it("sets the schema type", () => {
    const data = { title: "Pretty Painting" }
    const props = { data }
    renderComponent(props)
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@type": "Product"')
    expect(script?.textContent).toMatch('"title": "Pretty Painting"')
  })
})
