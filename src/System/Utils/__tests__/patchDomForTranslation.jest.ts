import { addBreadcrumb } from "@sentry/browser"
import { patchDomForTranslation } from "System/Utils/patchDomForTranslation"

jest.mock("@sentry/browser", () => ({ addBreadcrumb: jest.fn() }))

const wrapInFont = ({ parent, node }: { parent: Node; node: Node }) => {
  const font = document.createElement("font")
  parent.replaceChild(font, node)
  font.appendChild(node)
  return font
}

describe("patchDomForTranslation", () => {
  beforeAll(() => {
    patchDomForTranslation()
  })

  beforeEach(() => {
    ;(addBreadcrumb as jest.Mock).mockClear()
  })

  it("removes the translation wrapper when the node has moved into it", () => {
    const parent = document.createElement("div")
    const text = document.createTextNode("Hello")
    const sibling = document.createElement("span")
    parent.append(text, sibling)
    wrapInFont({ parent, node: text })

    expect(() => parent.removeChild(text)).not.toThrow()
    expect(Array.from(parent.childNodes)).toEqual([sibling])
    expect(addBreadcrumb).toHaveBeenCalledTimes(1)
  })

  it("ignores removeChild when the node is detached", () => {
    const parent = document.createElement("div")
    const text = document.createTextNode("Hello")

    expect(() => parent.removeChild(text)).not.toThrow()
  })

  it("still removes a real child without logging", () => {
    const parent = document.createElement("div")
    const child = document.createElement("span")
    parent.appendChild(child)

    parent.removeChild(child)

    expect(parent.childNodes).toHaveLength(0)
    expect(addBreadcrumb).not.toHaveBeenCalled()
  })

  it("inserts before the translation wrapper when the reference node has moved", () => {
    const parent = document.createElement("div")
    const reference = document.createTextNode("Hello")
    parent.appendChild(reference)
    const font = wrapInFont({ parent, node: reference })
    const newNode = document.createElement("span")

    expect(() => parent.insertBefore(newNode, reference)).not.toThrow()
    expect(Array.from(parent.childNodes)).toEqual([newNode, font])
    expect(addBreadcrumb).toHaveBeenCalledTimes(1)
  })

  it("appends when the reference node is detached", () => {
    const parent = document.createElement("div")
    const reference = document.createTextNode("Hello")
    const newNode = document.createElement("span")

    parent.insertBefore(newNode, reference)

    expect(Array.from(parent.childNodes)).toEqual([newNode])
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
    expect(addBreadcrumb).not.toHaveBeenCalled()
  })
})
