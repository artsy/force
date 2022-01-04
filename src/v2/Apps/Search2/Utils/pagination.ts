import { PageCursors } from "@artsy/palette"

interface PageCursor {
  cursor: string
  isCurrent: boolean
  page: number
}

const pageToCursorObject = (page: number, currentPage: number) => {
  return {
    cursor: "",
    page,
    isCurrent: currentPage === page,
  }
}

// Returns an array of PageCursor objects
// from start to end (page numbers).
const pageCursorsToArray = (
  start: number,
  end: number,
  currentPage: number
) => {
  const cursors: PageCursor[] = []

  for (let page = start; page <= end; page++) {
    cursors.push(pageToCursorObject(page, currentPage))
  }

  return cursors
}

export const createPageCursors = (
  currentPage: number,
  totalPages: number,
  max = 5
): PageCursors => {
  // If max is even, bump it up by 1, and log out a warning.
  if (max % 2 === 0) {
    max = max + 1
  }

  let pageCursors
  // Degenerate case of no records found.
  if (totalPages === 0) {
    pageCursors = { around: [pageToCursorObject(1, 1)] }
  } else if (totalPages <= max) {
    // Collection is short, and `around` includes page 1 and the last page.
    pageCursors = {
      around: pageCursorsToArray(1, totalPages, currentPage),
    }
  } else if (currentPage <= Math.floor(max / 2) + 1) {
    // We are near the beginning, and `around` will include page 1.
    pageCursors = {
      last: pageToCursorObject(totalPages, currentPage),
      around: pageCursorsToArray(1, max - 1, currentPage),
    }
  } else if (currentPage >= totalPages - Math.floor(max / 2)) {
    // We are near the end, and `around` will include the last page.
    pageCursors = {
      first: pageToCursorObject(1, currentPage),
      around: pageCursorsToArray(totalPages - max + 2, totalPages, currentPage),
    }
  } else {
    // We are in the middle, and `around` doesn't include the first or last page.
    const offset = Math.floor((max - 3) / 2)
    pageCursors = {
      first: pageToCursorObject(1, currentPage),
      around: pageCursorsToArray(
        currentPage - offset,
        currentPage + offset,
        currentPage
      ),
      last: pageToCursorObject(totalPages, currentPage),
    }
  }

  if (currentPage > 1 && totalPages > 1) {
    pageCursors.previous = pageToCursorObject(currentPage - 1, currentPage)
  }
  return pageCursors
}
