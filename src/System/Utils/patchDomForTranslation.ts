import { addBreadcrumb } from "@sentry/browser"
import { isPageTranslated } from "System/Utils/isPageTranslated"

let isPatched = false

// Browser translation (Chrome, Edge) wraps text nodes in <font> elements, so
// React later removes or inserts against nodes that moved. See facebook/react#11538.
export const patchDomForTranslation = (): void => {
  if (isPatched || typeof Node !== "function" || !Node.prototype) {
    return
  }

  isPatched = true

  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T) {
    if (child.parentNode === this) {
      return originalRemoveChild.call(this, child) as T
    }

    const wrapper = findFontWrapper({ node: child, parent: this })
    if (wrapper) {
      logPatchedCall("removeChild")
      originalRemoveChild.call(this, wrapper)
      return child
    }

    if (isPageTranslated()) {
      logPatchedCall("removeChild")
      return child
    }

    return originalRemoveChild.call(this, child) as T
  }

  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null,
  ) {
    if (!referenceNode || referenceNode.parentNode === this) {
      return originalInsertBefore.call(this, newNode, referenceNode) as T
    }

    const wrapper = findFontWrapper({ node: referenceNode, parent: this })
    if (wrapper) {
      logPatchedCall("insertBefore")
      return originalInsertBefore.call(this, newNode, wrapper) as T
    }

    if (isPageTranslated()) {
      logPatchedCall("insertBefore")
      return originalInsertBefore.call(this, newNode, null) as T
    }

    return originalInsertBefore.call(this, newNode, referenceNode) as T
  }
}

interface FindFontWrapperParams {
  node: Node
  parent: Node
}

const findFontWrapper = ({
  node,
  parent,
}: FindFontWrapperParams): Node | null => {
  let current: Node | null = node.parentNode

  while (current && current.parentNode !== parent) {
    current = current.parentNode
  }

  if (current?.nodeName !== "FONT") {
    return null
  }

  return current
}

const logPatchedCall = (method: "removeChild" | "insertBefore") => {
  addBreadcrumb({
    category: "dom.translation-patch",
    level: "warning",
    message: `Recovered ${method} on a node that moved out of its parent`,
  })
}
