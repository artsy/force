// We need this so the relay-compiler can auto-generate types.
export const graphql = (strings, ...keys) => {
  const lastIndex = strings.length - 1
  return (
    strings.slice(0, lastIndex).reduce((p, s, i) => p + s + keys[i], "") +
    strings[lastIndex]
  )
}
