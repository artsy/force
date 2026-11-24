import { addBreadcrumb } from "@sentry/browser"

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

    logPatchedCall("removeChild")

    const wrapper = findChildOf({ node: child, parent: this })
    if (wrapper) {
      originalRemoveChild.call(this, wrapper)
    }

    return child
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

    logPatchedCall("insertBefore")

    const anchor = findChildOf({ node: referenceNode, parent: this })

    return originalInsertBefore.call(this, newNode, anchor) as T
  }
}

interface FindChildOfParams {
  node: Node
  parent: Node
}

const findChildOf = ({ node, parent }: FindChildOfParams): Node | null => {
  let current: Node | null = node.parentNode

  while (current && current.parentNode !== parent) {
    current = current.parentNode
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
