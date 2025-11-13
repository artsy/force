export const mostRecentCreatedAt = <T extends { createdAt?: string | null }>(
  list: ReadonlyArray<T | null | undefined> | null | undefined
) => {
  if (!list || list.length === 0) {
    return null
  }
  // Get the most recent offer (sorted by createdAt, most recent first)
  const sorted = [...(list || [])]
    .filter((offer): offer is NonNullable<typeof offer> => offer !== null)
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA // Most recent first
    })

  const mostRecent = sorted[0]
  return mostRecent || null
}
