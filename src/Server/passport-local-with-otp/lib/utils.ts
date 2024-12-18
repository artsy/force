exports.lookup = (obj, field) => {
  if (!obj) {
    return null
  }
  const chain = field.split("]").join("").split("[")
  for (let i = 0, len = chain.length; i < len; i++) {
    const prop = obj[chain[i]]
    if (typeof prop === "undefined") {
      return null
    }
    if (typeof prop !== "object") {
      return prop
    }
    obj = prop
  }
  return null
}
