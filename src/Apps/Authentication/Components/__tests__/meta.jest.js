import { mount } from "enzyme"
import { AuthenticationMeta } from "../meta.tsx"

describe("AuthenticationMeta", () => {
  it("Renders expected data", () => {
    const component = mount(
      <AuthenticationMeta
        meta={{
          title: "Sign up for Artsy",
          description: "The best place to buy art",
        }}
      />
    )
    const meta = component.find("meta")
    // title
    expect(meta.at(0).getElement().props.property).toBe("og:title")
    expect(meta.at(0).getElement().props.content).toBe("Sign up for Artsy")

    // description
    expect(meta.at(1).getElement().props.property).toBe("description")
    expect(meta.at(1).getElement().props.content).toBe(
      "The best place to buy art"
    )

    expect(meta.at(2).getElement().props.property).toBe("og:description")
    expect(meta.at(2).getElement().props.content).toBe(
      "The best place to buy art"
    )

    expect(meta.at(3).getElement().props.property).toBe("twitter:description")
    expect(meta.at(3).getElement().props.content).toBe(
      "The best place to buy art"
    )
  })
})
