import { get } from "../get"

describe("get", () => {
  const deepObject = { a: { b: { c: { d: { e: "hi!" } } } } }

  it("returns deeply nested object values", () => {
    expect(get(deepObject, p => p.a.b.c.d.e)).toEqual("hi!")
  })

  it("returns a default value if path not found", () => {
    expect(get(deepObject, p => (p as any).a.b.c.d.e.f, "nope")).toEqual("nope")
  })

  it("allows arbitrary chaining", () => {
    expect(
      get(deepObject, p => (p as any).a.b[10].baz, ["fallback", "value"]).join(
        " "
      )
    ).toEqual("fallback value")
  })

  it("can pass types", () => {
    interface Place {
      name: string
      description: string
    }

    const place: Place = { name: "Hello", description: "how are you" }
    const description = get<Place, string>(place, p => p.description)
    expect(description).toEqual("how are you")
  })
})
