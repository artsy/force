export const tryParse = val => {
  try {
    return JSON.parse(val)
  } catch (_error) {
    return val
  }
}
