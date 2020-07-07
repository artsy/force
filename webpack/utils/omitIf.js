// @ts-check

export function omitIf(condition, loader) {
  if (condition) {
    return []
  } else {
    return [loader]
  }
}
