/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ConsignInDemandNowQueryVariables = {
    artistInternalId: string;
    artistSlug: string;
    medium: string;
};
export type ConsignInDemandNowQueryResponse = {
    readonly artist: {
        readonly birthday: string | null;
        readonly nationality: string | null;
        readonly auctionResultsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                    readonly title: string | null;
                    readonly dimensionText: string | null;
                    readonly images: {
                        readonly thumbnail: {
                            readonly url: string | null;
                            readonly resized: {
                                readonly srcSet: string;
                            } | null;
                        } | null;
                    } | null;
                    readonly description: string | null;
                    readonly dateText: string | null;
                    readonly organization: string | null;
                    readonly saleDate: string | null;
                    readonly priceRealized: {
                        readonly display: string | null;
                        readonly centsUSD: number | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly marketPriceInsights: {
        readonly annualLotsSold: number | null;
        readonly annualValueSoldCents: unknown | null;
        readonly artistId: string | null;
        readonly artistName: string | null;
        readonly artsyQInventory: number | null;
        readonly createdAt: unknown | null;
        readonly demandRank: number | null;
        readonly demandTrend: number | null;
        readonly highRangeCents: unknown | null;
        readonly largeHighRangeCents: unknown | null;
        readonly largeLowRangeCents: unknown | null;
        readonly largeMidRangeCents: unknown | null;
        readonly liquidityRank: number | null;
        readonly lowRangeCents: unknown | null;
        readonly medianSaleToEstimateRatio: number | null;
        readonly medium: string | null;
        readonly mediumHighRangeCents: unknown | null;
        readonly mediumLowRangeCents: unknown | null;
        readonly mediumMidRangeCents: unknown | null;
        readonly midRangeCents: unknown | null;
        readonly sellThroughRate: number | null;
        readonly smallHighRangeCents: unknown | null;
        readonly smallLowRangeCents: unknown | null;
        readonly smallMidRangeCents: unknown | null;
        readonly updatedAt: unknown | null;
    } | null;
};
export type ConsignInDemandNowQuery = {
    readonly response: ConsignInDemandNowQueryResponse;
    readonly variables: ConsignInDemandNowQueryVariables;
};



/*
query ConsignInDemandNowQuery(
  $artistInternalId: ID!
  $artistSlug: String!
  $medium: String!
) {
  artist(id: $artistSlug) {
    birthday
    nationality
    auctionResultsConnection(first: 1, sort: DATE_DESC) {
      edges {
        node {
          internalID
          title
          dimensionText
          images {
            thumbnail {
              url
              resized {
                srcSet
              }
            }
          }
          description
          dateText
          organization
          saleDate
          priceRealized {
            display
            centsUSD
          }
          id
        }
      }
    }
    id
  }
  marketPriceInsights(artistId: $artistInternalId, medium: $medium) {
    annualLotsSold
    annualValueSoldCents
    artistId
    artistName
    artsyQInventory
    createdAt
    demandRank
    demandTrend
    highRangeCents
    largeHighRangeCents
    largeLowRangeCents
    largeMidRangeCents
    liquidityRank
    lowRangeCents
    medianSaleToEstimateRatio
    medium
    mediumHighRangeCents
    mediumLowRangeCents
    mediumMidRangeCents
    midRangeCents
    sellThroughRate
    smallHighRangeCents
    smallLowRangeCents
    smallMidRangeCents
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalId",
    "type": "ID!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistSlug",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistSlug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "birthday",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nationality",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DATE_DESC"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionText",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotImages",
  "kind": "LinkedField",
  "name": "images",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "display",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "centsUSD",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "artistId",
      "variableName": "artistInternalId"
    },
    {
      "kind": "Variable",
      "name": "medium",
      "variableName": "medium"
    }
  ],
  "concreteType": "MarketPriceInsights",
  "kind": "LinkedField",
  "name": "marketPriceInsights",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualLotsSold",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "annualValueSoldCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artsyQInventory",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandRank",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandTrend",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "highRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "largeHighRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "largeLowRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "largeMidRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "liquidityRank",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lowRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medianSaleToEstimateRatio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediumHighRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediumLowRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mediumMidRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "midRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sellThroughRate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "smallHighRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "smallLowRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "smallMidRangeCents",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConsignInDemandNowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,sort:\"DATE_DESC\")"
          }
        ],
        "storageKey": null
      },
      (v14/*: any*/)
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConsignInDemandNowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v15/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,sort:\"DATE_DESC\")"
          },
          (v15/*: any*/)
        ],
        "storageKey": null
      },
      (v14/*: any*/)
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConsignInDemandNowQuery",
    "operationKind": "query",
    "text": "query ConsignInDemandNowQuery(\n  $artistInternalId: ID!\n  $artistSlug: String!\n  $medium: String!\n) {\n  artist(id: $artistSlug) {\n    birthday\n    nationality\n    auctionResultsConnection(first: 1, sort: DATE_DESC) {\n      edges {\n        node {\n          internalID\n          title\n          dimensionText\n          images {\n            thumbnail {\n              url\n              resized {\n                srcSet\n              }\n            }\n          }\n          description\n          dateText\n          organization\n          saleDate\n          priceRealized {\n            display\n            centsUSD\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n  marketPriceInsights(artistId: $artistInternalId, medium: $medium) {\n    annualLotsSold\n    annualValueSoldCents\n    artistId\n    artistName\n    artsyQInventory\n    createdAt\n    demandRank\n    demandTrend\n    highRangeCents\n    largeHighRangeCents\n    largeLowRangeCents\n    largeMidRangeCents\n    liquidityRank\n    lowRangeCents\n    medianSaleToEstimateRatio\n    medium\n    mediumHighRangeCents\n    mediumLowRangeCents\n    mediumMidRangeCents\n    midRangeCents\n    sellThroughRate\n    smallHighRangeCents\n    smallLowRangeCents\n    smallMidRangeCents\n    updatedAt\n  }\n}\n"
  }
};
})();
(node as any).hash = '569806281f642e911fd414a3f0ffc263';
export default node;
