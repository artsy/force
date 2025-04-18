import { Box, Separator, Text } from "@artsy/palette"
import { SendFeedback } from "Apps/Search/Components/SendFeedback"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import type { FC } from "react"

interface ZeroStateProps {
  term: string
}

export const ZeroState: FC<React.PropsWithChildren<ZeroStateProps>> = ({
  term,
}) => {
  const { hasFilters, filters } = useArtworkFilterContext()

  return (
    <>
      <Text variant={["lg-display", "xl"]}>
        {hasFilters ? (
          "No results found."
        ) : (
          <>
            No results found for
            <Box as="span" color="blue100">
              {" "}
              “{filters?.term ?? term}”
            </Box>
          </>
        )}
      </Text>

      <Text variant={["lg-display", "xl"]} color="mono60">
        {hasFilters
          ? "Try removing some filters or try another search term."
          : "Try checking for spelling errors or try another search term."}
      </Text>

      <Separator my={4} />

      <SendFeedback />
    </>
  )
}
