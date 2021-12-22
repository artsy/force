import { Box, Pagination } from "@artsy/palette"
import { HITS_PER_PAGE } from "../constants"
import { computeTotalPages, createPageCursors } from "../Utils/pagination"

export const AlgoliaPagination = props => {
  const { nbPages, currentRefinement, refine } = props
  const totalPages = computeTotalPages(nbPages, currentRefinement)
  const pageCursors = createPageCursors(
    currentRefinement,
    HITS_PER_PAGE,
    nbPages
  )

  return (
    <Box my={1}>
      <Pagination
        hasNextPage={currentRefinement < totalPages}
        onClick={(_cursor, page) => refine(page)}
        onNext={(_, page) => refine(page)}
        pageCursors={pageCursors}
      />
    </Box>
  )
}
