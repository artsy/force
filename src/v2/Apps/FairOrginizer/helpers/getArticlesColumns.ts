export function getArticlesColumns<T>(articles: T[]) {
  const leftColumn: T[] = []
  const rightColumn: T[] = []

  articles.forEach((article: T, i) => {
    ;(i % 2 === 0 ? leftColumn : rightColumn).push(article)
  })

  return { leftColumn, rightColumn }
}
