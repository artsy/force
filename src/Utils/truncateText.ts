/**
 * Truncates a string to a maximum length, adding an ellipsis ("...") if shortened.
 * Optionally breaks at the last occurrence of a separator within the allowed length.
 */
export const truncateText = (
  str: string,
  options: { length: number; separator?: string }
): string => {
  if (str.length <= options.length) return str

  let end = options.length - 3

  if (options.separator) {
    const lastSep = str.lastIndexOf(options.separator, end)
    if (lastSep > 0) end = lastSep
  }

  return `${str.slice(0, end)}...`
}
