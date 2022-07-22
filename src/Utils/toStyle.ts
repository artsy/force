export const toStyle = (style: Record<string, string | number | undefined>) => {
  return Object.entries(style)
    .map(([key, value]) => {
      const property = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)
      return `${property}: ${value};`
    })
    .join("")
}
