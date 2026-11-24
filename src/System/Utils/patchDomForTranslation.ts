let isPatched = false

// Browser translation (Chrome, Edge) swaps text nodes for <font> wrappers, so
// React later removes or inserts against nodes that moved. See facebook/react#11538.
export const patchDomForTranslation = () => {
  if (isPatched || typeof Node !== "function" || !Node.prototype) {
    return
  }

  isPatched = true

  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T) {
    if (child.parentNode !== this) {
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
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode
    }

    return originalInsertBefore.call(this, newNode, referenceNode) as T
  }
}
