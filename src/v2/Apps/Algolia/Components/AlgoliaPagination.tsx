import { Box, Pagination } from "@artsy/palette"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"
import { ANCHOR_CONTAINER_ID } from "../constants"
import { createPageCursors } from "../Utils/pagination"

export const AlgoliaPagination = props => {
  const { nbPages, currentRefinement, refine } = props
  const pageCursors = createPageCursors(currentRefinement, nbPages)
  const { scrollTo } = useScrollTo({
    selectorOrRef: `#${ANCHOR_CONTAINER_ID}`,
    behavior: "smooth",
  })

  const handleSelectPage = (page: number) => {
    refine(page)
    scrollTo()
  }

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
