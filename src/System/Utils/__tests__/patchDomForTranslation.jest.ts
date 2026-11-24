import { addBreadcrumb } from "@sentry/browser"
import { patchDomForTranslation } from "System/Utils/patchDomForTranslation"

jest.mock("@sentry/browser", () => ({ addBreadcrumb: jest.fn() }))

const wrapIn = ({
  parent,
  node,
  tagName,
}: {
  parent: Node
  node: Node
  tagName: string
}) => {
  const wrapper = document.createElement(tagName)
  parent.replaceChild(wrapper, node)
  wrapper.appendChild(node)
  return wrapper
}

const setPageTranslated = (isTranslated: boolean) => {
  document.documentElement.classList.toggle("translated-ltr", isTranslated)
}

describe("patchDomForTranslation", () => {
  beforeAll(() => {
    patchDomForTranslation()
  })

  beforeEach(() => {
    ;(addBreadcrumb as jest.Mock).mockClear()
    setPageTranslated(false)
  })

  describe("removeChild", () => {
    it("removes the <font> wrapper when the node has moved into it", () => {
      const parent = document.createElement("div")
      const text = document.createTextNode("Hello")
      const sibling = document.createElement("span")
      parent.append(text, sibling)
      wrapIn({ parent, node: text, tagName: "font" })

      expect(() => parent.removeChild(text)).not.toThrow()
      expect(Array.from(parent.childNodes)).toEqual([sibling])
      expect(addBreadcrumb).toHaveBeenCalledTimes(1)
    })

    it("throws and keeps a non-<font> ancestor on an untranslated page", () => {
      const parent = document.createElement("div")
      const text = document.createTextNode("Hello")
      parent.appendChild(text)
      const span = wrapIn({ parent, node: text, tagName: "span" })

      expect(() => parent.removeChild(text)).toThrow()
      expect(Array.from(parent.childNodes)).toEqual([span])
    })

    it("throws for a detached node on an untranslated page", () => {
      const parent = document.createElement("div")
      const text = document.createTextNode("Hello")

      expect(() => parent.removeChild(text)).toThrow()
    })

    it("ignores a detached node on a translated page", () => {
      setPageTranslated(true)
      const parent = document.createElement("div")
      const text = document.createTextNode("Hello")

      expect(() => parent.removeChild(text)).not.toThrow()
      expect(addBreadcrumb).toHaveBeenCalledTimes(1)
    })

    it("still removes a real child without logging", () => {
      const parent = document.createElement("div")
      const child = document.createElement("span")
      parent.appendChild(child)

      parent.removeChild(child)

      expect(parent.childNodes).toHaveLength(0)
      expect(addBreadcrumb).not.toHaveBeenCalled()
    })
  })

  describe("insertBefore", () => {
    it("inserts before the <font> wrapper when the reference node has moved", () => {
      const parent = document.createElement("div")
      const reference = document.createTextNode("Hello")
      parent.appendChild(reference)
      const font = wrapIn({ parent, node: reference, tagName: "font" })
      const newNode = document.createElement("span")

      expect(() => parent.insertBefore(newNode, reference)).not.toThrow()
      expect(Array.from(parent.childNodes)).toEqual([newNode, font])
      expect(addBreadcrumb).toHaveBeenCalledTimes(1)
    })

    it("throws for a detached reference node on an untranslated page", () => {
      const parent = document.createElement("div")
      const reference = document.createTextNode("Hello")
      const newNode = document.createElement("span")

      expect(() => parent.insertBefore(newNode, reference)).toThrow()
    })

    it("appends when the reference node is detached on a translated page", () => {
      setPageTranslated(true)
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
})
