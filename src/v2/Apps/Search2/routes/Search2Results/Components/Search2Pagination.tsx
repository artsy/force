import { Box, Pagination } from "@artsy/palette"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"
import { ANCHOR_CONTAINER_ID } from "v2/Apps/Search2/constants"
import { createPageCursors } from "v2/Apps/Search2/Utils/pagination"

interface Search2PaginationProps {
  nbPages: number
  currentRefinement: number
  refine: (page: number) => void
}

export const Search2Pagination: React.FC<Search2PaginationProps> = props => {
  const { nbPages, currentRefinement, refine } = props
  const { scrollTo } = useScrollTo({
    selectorOrRef: `#${ANCHOR_CONTAINER_ID}`,
    behavior: "smooth",
  })

  const handleSelectPage = (page: number) => {
    refine(page)
    scrollTo()
  }

  if (nbPages !== 0) {
    const pageCursors = createPageCursors(currentRefinement, nbPages)

    return (
      <Box my={1}>
        <Pagination
          hasNextPage={currentRefinement < nbPages}
          onClick={(_cursor, page, event) => {
            event.preventDefault()
            handleSelectPage(page)
          }}
          onNext={(event, page) => {
            event.preventDefault()
            handleSelectPage(page)
          }}
          pageCursors={pageCursors}
        />
      </Box>
    )
  }

  return null
}
