import { Grid } from "Components/Grid"
import { ReactNode } from "react"

export interface Grid2Props<ItemT = any> {
  data: { image: { aspectRatio: number } | null }[]
  renderItem: (item: ItemT, index: number) => ReactNode
  columnCount?: number[]
  onLoadMore?: () => any
  sectionMargin?: number
  style?: React.CSSProperties | undefined
}

export const Grid2: React.FC<Grid2Props> = ({ data, renderItem, ...props }) => {
  const children = data.map(renderItem)
  const aspectRatios = data.map(item => item?.image?.aspectRatio)

  return (
    <Grid aspectRatios={aspectRatios} {...props}>
      {children}
    </Grid>
  )
}
