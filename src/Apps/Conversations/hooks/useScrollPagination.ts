import { MutableRefObject, useRef } from "react"

const MAX_ELEMENTS = 2
/**
 * This hook controls the messages pagination storing the refs with a mechanism
 * to append refs. There is a maximum of refs(MAX_ELEMENTS) once we appended more than one
 * tries to scrollIntoView of the previous element.
 */
export const useScrollPagination = <T extends HTMLElement>() => {
  const elementsRef = useRef<T[]>([])
  const elementsKeysStoredRef = useRef<string[]>([])

  const appendElementRef = (
    element: MutableRefObject<T> | undefined,
    key: string
  ) => {
    if (!element || elementsKeysStoredRef.current.includes(key)) {
      return
    }

    elementsRef.current.push(element as any)
    elementsKeysStoredRef.current.push(key)

    const length = elementsRef.current.length
    if (length > MAX_ELEMENTS) {
      const prunedElements = elementsRef.current.slice(
        length - MAX_ELEMENTS,
        length
      )
      const prunedKeys = elementsKeysStoredRef.current.slice(
        length - MAX_ELEMENTS,
        length
      )
      elementsRef.current = prunedElements
      elementsKeysStoredRef.current = prunedKeys
    }

    if (length > 1) {
      elementsRef.current[0].scrollIntoView()
    }
  }

  return { appendElementRef }
}
