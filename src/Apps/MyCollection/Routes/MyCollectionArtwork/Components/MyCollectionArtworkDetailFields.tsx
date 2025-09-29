import { CSSGrid } from "@artsy/palette"
import { MyCollectionArtworkDetailField } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetailField"

export interface MyCollectionArtworkDetailFieldSpec {
  label: string
  value?: string | null
  maxLines?: number
}

export const MyCollectionArtworkDetailFields: React.FC<{
  fields: MyCollectionArtworkDetailFieldSpec[]
}> = ({ fields }) => {
  return (
    <CSSGrid
      gridTemplateColumns="max-content 1fr"
      gridColumnGap={4}
      gridRowGap={0.5}
    >
      {fields.map(({ label, value, maxLines }, index) => (
        <MyCollectionArtworkDetailField
          key={`${label}-${index}`}
          label={label}
          value={value}
          maxLines={maxLines}
        />
      ))}
    </CSSGrid>
  )
}
