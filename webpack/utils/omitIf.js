// @ts-check

exports.omitIf = (condition, loader) => {
  if (condition) {
    return []
  } else {
    return [loader]
  }
}
