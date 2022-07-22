import { Column, GridColumns } from "@artsy/palette"
import { PartnersLocationAutocompleteQueryRenderer } from "./PartnersLocationAutocomplete"
import { PartnersSearchQueryRenderer } from "./PartnersSearch"
import { PartnersSpecialtyAutocompleteQueryRenderer } from "./PartnersSpecialtyAutocomplete"

interface PartnersFiltersProps {
  type: "INSTITUTION" | "GALLERY"
}

export const PartnersFilters: React.FC<PartnersFiltersProps> = ({ type }) => {
  return (
    <GridColumns>
      <Column span={4}>
        <PartnersLocationAutocompleteQueryRenderer />
      </Column>

      <Column span={4}>
        <PartnersSpecialtyAutocompleteQueryRenderer type={type} />
      </Column>

      <Column span={4}>
        <PartnersSearchQueryRenderer type={type} />
      </Column>
    </GridColumns>
  )
}
