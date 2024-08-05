export const tryParse = val => {
  try {
    return JSON.parse(val)
  } catch (error) {
    return val
  }
}
