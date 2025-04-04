import { identity, pickBy } from "lodash"

/**
 * Removes null and undefined values from an object
 */
export function cleanObject(obj) {
  return pickBy(obj, identity)
}
