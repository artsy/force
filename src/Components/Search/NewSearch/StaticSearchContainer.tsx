import { Box, BoxProps } from "@artsy/palette"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { SearchInputContainer } from "Components/Search/SearchInputContainer"

/**
 * Displays during SSR render.
 */
export const StaticSearchContainer: FC<{ searchQuery: string } & BoxProps> = ({
  searchQuery,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Box display={["block", "none"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchArtsy`}
          defaultValue={searchQuery}
        />
      </Box>

      <Box display={["none", "block"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchBy`}
          defaultValue={searchQuery}
        />
      </Box>
    </>
  )
}
