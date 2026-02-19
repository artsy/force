/** Pick specified keys from an object */
const pick = (obj, keys) => {
  return keys.reduce((result, key) => {
    if (key in obj) result[key] = obj[key]
    return result
  }, {})
}

/** Omit specified keys from an object */
const omit = (obj, keys) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  )
}

/** Check if a value is empty (null, undefined, empty string/array/object) */
const isEmpty = (value) => {
  if (value == null) return true
  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

module.exports = { pick, omit, isEmpty }
