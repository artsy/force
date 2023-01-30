import { Shelf } from "@artsy/palette"
import { SavesItem } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesItem"
import { FC, useState } from "react"

const items = Array.from(Array(10))

export const CollectorProfileSaves2Route: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Shelf showProgress={false}>
      {items.map((_, index) => (
        <SavesItem
          key={`saves-item-${index}`}
          title="Saves"
          artworksCount={36}
          isSelected={selectedIndex === index}
          imagesLayout={index === 0 ? "grid" : "stacked"}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </Shelf>
  )
}
