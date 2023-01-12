import { Masonry2 } from "Components/Masonry2"
import { ReactNode } from "react"

export interface Masonry3Props<ItemT = any> {
  data: { image: { aspectRatio: number } | null }[]
  renderItem: (item: ItemT, index: number) => ReactNode
  columnCount?: number[]
  onLoadMore?: () => any
  sectionMargin?: number
  style?: React.CSSProperties | undefined
}

export const Masonry3: React.FC<Masonry3Props> = ({
  data,
  renderItem,
  ...props
}) => {
  const children = data.map(renderItem)
  const aspectRatios = data.map(item => item?.image?.aspectRatio)

  return (
    <Masonry2 aspectRatios={aspectRatios} {...props}>
      {children}
    </Masonry2>
  )
}
