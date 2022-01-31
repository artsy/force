/**
 * @generated SignedSource<<f08f36665270278fd6402b8ead58dedc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ConsignPriceEstimateContext_ArtistInsights_Query$variables = {
  artistInternalID: string;
};
export type ConsignPriceEstimateContext_ArtistInsights_Query$data = {
  readonly priceInsights: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artistName: string | null;
        readonly medium: string | null;
        readonly lowRangeCents: any | null;
        readonly midRangeCents: any | null;
        readonly highRangeCents: any | null;
      } | null;
    } | null> | null;
  } | null;
};
export type ConsignPriceEstimateContext_ArtistInsights_Query = {
  variables: ConsignPriceEstimateContext_ArtistInsights_Query$variables;
  response: ConsignPriceEstimateContext_ArtistInsights_Query$data;
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
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DEMAND_RANK_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lowRangeCents",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "midRangeCents",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "highRangeCents",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "selections": [
      {
        "alias": null,
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "selections": [
      {
        "alias": null,
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
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
    "cacheID": "caecc62bbbdd378f288de4ac417a1cb2",
    "id": null,
    "metadata": {},
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "operationKind": "query",
    "text": "query ConsignPriceEstimateContext_ArtistInsights_Query(\n  $artistInternalID: ID!\n) {\n  priceInsights(artistId: $artistInternalID, sort: DEMAND_RANK_DESC, first: 20) {\n    edges {\n      node {\n        artistName\n        medium\n        lowRangeCents\n        midRangeCents\n        highRangeCents\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fd748455cd7168dcb4ec330cbe7a81bc";

export default node;
