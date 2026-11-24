import { patchDomForTranslation } from "System/Utils/patchDomForTranslation"

describe("patchDomForTranslation", () => {
  beforeAll(() => {
    patchDomForTranslation()
  })

  it("ignores removeChild when the node has moved under another parent", () => {
    const parent = document.createElement("div")
    const text = document.createTextNode("Hello")
    parent.appendChild(text)

    const font = document.createElement("font")
    parent.replaceChild(font, text)
    font.appendChild(text)

    expect(() => parent.removeChild(text)).not.toThrow()
    expect(font.contains(text)).toBe(true)
  })

  it("still removes a real child", () => {
    const parent = document.createElement("div")
    const child = document.createElement("span")
    parent.appendChild(child)

    parent.removeChild(child)

    expect(parent.childNodes).toHaveLength(0)
  })

  it("ignores insertBefore when the reference node has moved", () => {
    const parent = document.createElement("div")
    const reference = document.createTextNode("Hello")
    parent.appendChild(reference)

    const font = document.createElement("font")
    parent.replaceChild(font, reference)
    font.appendChild(reference)

    const newNode = document.createElement("span")

    expect(() => parent.insertBefore(newNode, reference)).not.toThrow()
  })

  it("still inserts before a real child and appends with a null reference", () => {
    const parent = document.createElement("div")
    const first = document.createElement("span")
    parent.appendChild(first)

    const before = document.createElement("b")
    parent.insertBefore(before, first)
    const last = document.createElement("i")
    parent.insertBefore(last, null)

    expect(Array.from(parent.childNodes)).toEqual([before, first, last])
  })
})
