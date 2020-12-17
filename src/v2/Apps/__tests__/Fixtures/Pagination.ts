import { Pagination_pageCursors } from "v2/__generated__/Pagination_pageCursors.graphql"

export const paginationProps = {
  callbacks: {
    onClick: () => {
      /* */
    },
    onNext: () => {
      /* */
    },
  },
  cursor: {
    " $refType": null,
    around: [
      { cursor: "Y3Vyc29yMw==", isCurrent: true, page: 6 },
      { cursor: "Y3Vyc29yMg==", isCurrent: false, page: 7 },
      { cursor: "Y3Vyc29yMw==", isCurrent: false, page: 8 },
      { cursor: "Y3Vyc29yMw==", isCurrent: false, page: 9 },
    ],
    first: { cursor: "Y3Vyc29yMg==", isCurrent: false, page: 1 },
    last: { cursor: "Y3Vyc29yMw==", isCurrent: false, page: 20 },
    previous: { cursor: "Y3Vyc29yMw==", isCurrent: false, page: 5 },
  } as Pagination_pageCursors,
}
