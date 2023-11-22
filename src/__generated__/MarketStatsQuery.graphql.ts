/**
 * @generated SignedSource<<fc6e5eca8288031676d3aaa1b36e8469>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketStatsQuery$variables = {
  id: string;
};
export type MarketStatsQuery$data = {
  readonly priceInsightsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"MarketStats_priceInsightsConnection">;
  } | null | undefined;
};
export type MarketStatsQuery = {
  response: MarketStatsQuery$data;
  variables: MarketStatsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artistId",
    "variableName": "id"
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "ANNUAL_VALUE_SOLD_CENTS_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MarketStatsQuery",
    "selections": [
      {
        "alias": "priceInsightsConnection",
        "args": (v1/*: any*/),
        "concreteType": "PriceInsightConnection",
        "kind": "LinkedField",
        "name": "priceInsights",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MarketStats_priceInsightsConnection"
          }
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
    "name": "MarketStatsQuery",
    "selections": [
      {
        "alias": "priceInsightsConnection",
        "args": (v1/*: any*/),
        "concreteType": "PriceInsightConnection",
        "kind": "LinkedField",
        "name": "priceInsights",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PriceInsightEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MarketPriceInsights",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
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
                    "name": "sellThroughRate",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "medianSaleOverEstimatePercentage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
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
      }
    ]
  },
  "params": {
    "cacheID": "fafc456832280ec06ded8fbd9f8eb129",
    "id": null,
    "metadata": {},
    "name": "MarketStatsQuery",
    "operationKind": "query",
    "text": "query MarketStatsQuery(\n  $id: ID!\n) {\n  priceInsightsConnection: priceInsights(artistId: $id, sort: ANNUAL_VALUE_SOLD_CENTS_DESC) {\n    ...MarketStats_priceInsightsConnection\n  }\n}\n\nfragment MarketStats_priceInsightsConnection on PriceInsightConnection {\n  edges {\n    node {\n      medium\n      annualLotsSold\n      annualValueSoldCents\n      sellThroughRate\n      medianSaleOverEstimatePercentage\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "73ab657b171c61e7b674706ecb1c58dc";

export default node;
