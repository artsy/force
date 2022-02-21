import { Pagination_pageCursors$data } from "v2/__generated__/Pagination_pageCursors.graphql"

export const paginationProps = {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  cursor: {
    first: { page: 1, cursor: "Y3Vyc29yMg==", isCurrent: false },
    last: { page: 20, cursor: "Y3Vyc29yMw==", isCurrent: false },
    around: [
      { page: 6, cursor: "Y3Vyc29yMw==", isCurrent: true },
      { page: 7, cursor: "Y3Vyc29yMg==", isCurrent: false },
      { page: 8, cursor: "Y3Vyc29yMw==", isCurrent: false },
      { page: 9, cursor: "Y3Vyc29yMw==", isCurrent: false },
    ],
    previous: { page: 5, cursor: "Y3Vyc29yMw==", isCurrent: false },
    " $refType": null,
  } as Pagination_pageCursors$data,
  callbacks: {
    onClick: () => {
      /* */
    },
    onNext: () => {
      /* */
    },
  },
}
