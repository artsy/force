/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
                        readonly larger: {
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
            larger {
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
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistSlug"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "medium"
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
      "name": "larger",
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
v14 = [
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
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annualLotsSold",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "annualValueSoldCents",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistId",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistName",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artsyQInventory",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "demandRank",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "demandTrend",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "highRangeCents",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "largeHighRangeCents",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "largeLowRangeCents",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "largeMidRangeCents",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "liquidityRank",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lowRangeCents",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medianSaleToEstimateRatio",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumHighRangeCents",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumLowRangeCents",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumMidRangeCents",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "midRangeCents",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sellThroughRate",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "smallHighRangeCents",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "smallLowRangeCents",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "smallMidRangeCents",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v40 = {
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
      {
        "alias": null,
        "args": (v14/*: any*/),
        "concreteType": "MarketPriceInsights",
        "kind": "LinkedField",
        "name": "marketPriceInsights",
        "plural": false,
        "selections": [
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          (v25/*: any*/),
          (v26/*: any*/),
          (v27/*: any*/),
          (v28/*: any*/),
          (v29/*: any*/),
          (v30/*: any*/),
          (v31/*: any*/),
          (v32/*: any*/),
          (v33/*: any*/),
          (v34/*: any*/),
          (v35/*: any*/),
          (v36/*: any*/),
          (v37/*: any*/),
          (v38/*: any*/),
          (v39/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
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
                      (v40/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,sort:\"DATE_DESC\")"
          },
          (v40/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v14/*: any*/),
        "concreteType": "MarketPriceInsights",
        "kind": "LinkedField",
        "name": "marketPriceInsights",
        "plural": false,
        "selections": [
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          (v23/*: any*/),
          (v24/*: any*/),
          (v25/*: any*/),
          (v26/*: any*/),
          (v27/*: any*/),
          (v28/*: any*/),
          (v29/*: any*/),
          (v30/*: any*/),
          (v31/*: any*/),
          (v32/*: any*/),
          (v33/*: any*/),
          (v34/*: any*/),
          (v35/*: any*/),
          (v36/*: any*/),
          (v37/*: any*/),
          (v38/*: any*/),
          (v39/*: any*/),
          (v40/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "341eb496fdc17c3ddcb498395541f3ad",
    "id": null,
    "metadata": {},
    "name": "ConsignInDemandNowQuery",
    "operationKind": "query",
    "text": "query ConsignInDemandNowQuery(\n  $artistInternalId: ID!\n  $artistSlug: String!\n  $medium: String!\n) {\n  artist(id: $artistSlug) {\n    birthday\n    nationality\n    auctionResultsConnection(first: 1, sort: DATE_DESC) {\n      edges {\n        node {\n          internalID\n          title\n          dimensionText\n          images {\n            larger {\n              url\n              resized {\n                srcSet\n              }\n            }\n          }\n          description\n          dateText\n          organization\n          saleDate\n          priceRealized {\n            display\n            centsUSD\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n  marketPriceInsights(artistId: $artistInternalId, medium: $medium) {\n    annualLotsSold\n    annualValueSoldCents\n    artistId\n    artistName\n    artsyQInventory\n    createdAt\n    demandRank\n    demandTrend\n    highRangeCents\n    largeHighRangeCents\n    largeLowRangeCents\n    largeMidRangeCents\n    liquidityRank\n    lowRangeCents\n    medianSaleToEstimateRatio\n    medium\n    mediumHighRangeCents\n    mediumLowRangeCents\n    mediumMidRangeCents\n    midRangeCents\n    sellThroughRate\n    smallHighRangeCents\n    smallLowRangeCents\n    smallMidRangeCents\n    updatedAt\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f54709154acdcdc5085aa6cb22ccf421';
export default node;
