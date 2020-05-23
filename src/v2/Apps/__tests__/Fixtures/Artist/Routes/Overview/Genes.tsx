import { Genes_Test_QueryRawResponse } from "v2/__generated__/Genes_Test_Query.graphql"

export const GenesFixture = {
  id: "pablo-picasso",
  related: {
    genes: {
      edges: [
        {
          node: {
            id: "catty-art",
            href: "/gene/catty-art",
            name: "Catty Art",
          },
        },
      ],
    },
  },
} as Genes_Test_QueryRawResponse["artist"]
