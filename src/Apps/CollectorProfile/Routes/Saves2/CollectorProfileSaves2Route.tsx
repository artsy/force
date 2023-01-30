import { Shelf } from "@artsy/palette"
import { SavesItem } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesItem"
import { FC } from "react"

const items = Array.from(Array(10))

export const CollectorProfileSaves2Route: FC = () => {
  return (
    <Shelf showProgress={false}>
      {items.map((_, index) => (
        <SavesItem
          key={`saves-item-${index}`}
          title="Saves"
          artworksCount={36}
          isSelected={index === 0}
          imagesLayout={index === 0 ? "grid" : "stacked"}
        />
      ))}
    </Shelf>
  )
}
