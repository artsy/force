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
  priceInsights(artistId: $artistInternalID, sort: DEMAND_RANK_DESC, first: 1) {
    edges {
      node {
        artistName
        lowRangeCents
        midRangeCents
        highRangeCents
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "artistId",
        "variableName": "artistInternalID"
      },
      {
        "kind": "Literal",
        "name": "first",
        "value": 1
      },
      {
        "kind": "Literal",
        "name": "sort",
        "value": "DEMAND_RANK_DESC"
      }
    ],
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
                "name": "artistName",
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
                "name": "midRangeCents",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "highRangeCents",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "selections": (v1/*: any*/),
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConsignPriceEstimateContext_ArtistInsights_Query",
    "operationKind": "query",
    "text": "query ConsignPriceEstimateContext_ArtistInsights_Query(\n  $artistInternalID: ID!\n) {\n  priceInsights(artistId: $artistInternalID, sort: DEMAND_RANK_DESC, first: 1) {\n    edges {\n      node {\n        artistName\n        lowRangeCents\n        midRangeCents\n        highRangeCents\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '9d289258b4d28ff49f51456b8c61dc58';
export default node;
