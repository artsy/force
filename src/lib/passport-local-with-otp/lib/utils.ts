exports.lookup = function (obj, field) {
  if (!obj) {
    return null
  }
  let chain = field.split("]").join("").split("[")
  for (let i = 0, len = chain.length; i < len; i++) {
    let prop = obj[chain[i]]
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
