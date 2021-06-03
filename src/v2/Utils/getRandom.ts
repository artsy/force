import { random } from "lodash"

export const getRandomElement = elements => {
  const index = random(elements.length - 1, false)
  return elements[index]
}
