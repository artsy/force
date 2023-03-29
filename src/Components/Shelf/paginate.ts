/**
 * Sums all values, building from the previous
 * @param xs list of values to compound
 */
export const compound = (xs: number[]): number[] => {
  // @ts-expect-error  MIGRATE_STRICT_MODE
  return xs.reduce((p, n) => p.concat((+p.slice(-1) || 0) + n), [])
}

/**
 * Build an array of offsets
 * @param viewport window width
 * @param values array of cell widths
 */
export const chunk = ({
  viewport,
  values,
}: {
  viewport: number
  values: number[]
}) => {
  return values.reduce(
    (acc, value) => {
      const prev = acc[acc.length - 1]
      if (prev + value <= viewport) {
        acc[acc.length - 1] += value
        return acc
      }
      return [...acc, value]
    },
    [0]
  )
}

/** Align last page to the left or right */
export type CarouselPaginationAlignment = "left" | "right"

export type CarouselPaginateBy = "page" | "cell"

interface PaginateCarouselProps {
  viewport: number
  values: number[]
  alignment?: CarouselPaginationAlignment
  paginateBy?: CarouselPaginateBy
}

const paginateCarouselByCell = ({
  values,
  viewport,
}: Pick<PaginateCarouselProps, "values" | "viewport">) => {
  const sum = values.reduce((acc, curr) => acc + curr, 0)

  // No need to paginate
  if (sum <= viewport) {
    return [0]
  }

  const offsets = compound(values)
  const lastOffset = offsets[offsets.length - 1]
  const offsetToLastCell = lastOffset - viewport + 100
  const edges = offsets.filter(offset => offsetToLastCell > offset)

  return [0, ...edges, offsetToLastCell]
}

/**
 * Creates an array of offsets based on the given viewport
 * @param viewport window width
 * @param values array of cell widths
 * @param alignment align last page to the left or right
 */
export const paginateCarousel = ({
  viewport,
  values,
  alignment = "right",
  paginateBy = "page",
}: PaginateCarouselProps) => {
  if (paginateBy === "cell") {
    return paginateCarouselByCell({ values, viewport })
  }

  const offsets = chunk({ viewport, values })

  // Only a single page — no need to paginate
  if (offsets.length === 1) {
    return [0]
  }

  // Last page align right
  if (alignment === "right") {
    const edges = compound(offsets)
    const head = edges.slice(0, -2)
    const tail = edges[edges.length - 1] - viewport
    return [0, ...head, tail]
  }

  // Last page align left
  const pages = compound(offsets).slice(0, -1)

  return [0, ...pages]
}
