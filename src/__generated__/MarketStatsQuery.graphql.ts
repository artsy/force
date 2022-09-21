/**
 * @generated SignedSource<<83799c4b3cc582d59ffa9f097ade266a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketStatsQuery$variables = {
  artistInternalID: string;
};
export type MarketStatsQuery$data = {
  readonly priceInsightsConnection: {
    readonly " $fragmentSpreads": FragmentRefs<"MarketStats_priceInsightsConnection">;
  } | null;
};
export type MarketStatsQuery = {
  variables: MarketStatsQuery$variables;
  response: MarketStatsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "artistId",
    "variableName": "artistInternalID"
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
    "cacheID": "493670ff35fcfa2c2a856f7060338013",
    "id": null,
    "metadata": {},
    "name": "MarketStatsQuery",
    "operationKind": "query",
    "text": "query MarketStatsQuery(\n  $artistInternalID: ID!\n) {\n  priceInsightsConnection: priceInsights(artistId: $artistInternalID, sort: ANNUAL_VALUE_SOLD_CENTS_DESC) {\n    ...MarketStats_priceInsightsConnection\n  }\n}\n\nfragment MarketStats_priceInsightsConnection on PriceInsightConnection {\n  edges {\n    node {\n      medium\n      annualLotsSold\n      annualValueSoldCents\n      sellThroughRate\n      medianSaleOverEstimatePercentage\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b8c04641b23e82c0ad5fb0e068f340a0";

export default node;
