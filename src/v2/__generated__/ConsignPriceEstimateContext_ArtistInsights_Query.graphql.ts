/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ConsignPriceEstimateContext_ArtistInsights_QueryVariables = {
    artistInternalID: string;
};
export type ConsignPriceEstimateContext_ArtistInsights_QueryResponse = {
    readonly priceInsights: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artistName: string | null;
                readonly medium: string | null;
                readonly lowRangeCents: unknown | null;
                readonly midRangeCents: unknown | null;
                readonly highRangeCents: unknown | null;
            } | null;
        } | null> | null;
    } | null;
};
export type ConsignPriceEstimateContext_ArtistInsights_Query = {
    readonly response: ConsignPriceEstimateContext_ArtistInsights_QueryResponse;
    readonly variables: ConsignPriceEstimateContext_ArtistInsights_QueryVariables;
};



/*
query ConsignPriceEstimateContext_ArtistInsights_Query(
  $artistInternalID: ID!
) {
  priceInsights(artistId: $artistInternalID, sort: DEMAND_RANK_DESC, first: 20) {
    edges {
      node {
        artistName
        medium
        lowRangeCents
        midRangeCents
        highRangeCents
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistInternalID",
    "type": "ID!"
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "operationKind": "query",
    "text": "query ConsignPriceEstimateContext_ArtistInsights_Query(\n  $artistInternalID: ID!\n) {\n  priceInsights(artistId: $artistInternalID, sort: DEMAND_RANK_DESC, first: 20) {\n    edges {\n      node {\n        artistName\n        medium\n        lowRangeCents\n        midRangeCents\n        highRangeCents\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fd748455cd7168dcb4ec330cbe7a81bc';
export default node;
