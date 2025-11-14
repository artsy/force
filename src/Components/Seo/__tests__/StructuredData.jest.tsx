import { StructuredData } from "Components/Seo/StructuredData"
import { render } from "@testing-library/react"
import { HeadProvider } from "react-head"
import type { BreadcrumbList, WithContext } from "schema-dts"

describe("StructuredData", () => {
  const defaultProps: { schemaData: WithContext<BreadcrumbList> } = {
    schemaData: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://example.com",
            name: "Test Item",
          },
        },
      ],
    },
  }

  const renderComponent = (props = {}) => {
    return render(
      <HeadProvider>
        <StructuredData {...defaultProps} {...props} />
      </HeadProvider>,
    )
  }

  it("renders a script tag with the right type", () => {
    renderComponent()
    const script = document.querySelector("script")
    expect(script).toBeInTheDocument()
    expect(script?.getAttribute("type")).toEqual("application/ld+json")
  })

  it("renders schema content", () => {
    const schemaData = { "@type": "Object", foo: "bar" }
    const props = { schemaData }
    renderComponent(props)
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@type": "Object"')
    expect(script?.textContent).toMatch('"foo": "bar"')
  })

  it("sets the context", () => {
    renderComponent()
    const script = document.querySelector("script")
    expect(script?.textContent).toMatch('"@context": "https://schema.org"')
  })
})
