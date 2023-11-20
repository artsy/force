/**
 * @generated SignedSource<<f4eb68d1b3e3aaa78e678eaaf247622e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceAggregationsQuery$variables = {
  artistID: string;
};
export type PriceAggregationsQuery$data = {
  readonly artist: {
    readonly filterArtworksConnection: {
      readonly " $fragmentSpreads": FragmentRefs<"Price_aggregations">;
    } | null;
  } | null;
};
export type PriceAggregationsQuery = {
  response: PriceAggregationsQuery$data;
  variables: PriceAggregationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "SIMPLE_PRICE_HISTOGRAM"
    ]
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 0
  }
],
v3 = {
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
    "name": "PriceAggregationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Price_aggregations"
              }
            ],
            "storageKey": "filterArtworksConnection(aggregations:[\"SIMPLE_PRICE_HISTOGRAM\"],first:0)"
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
    "name": "PriceAggregationsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(aggregations:[\"SIMPLE_PRICE_HISTOGRAM\"],first:0)"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7fd9f50513fe8831ab80a2e0dacb7bef",
    "id": null,
    "metadata": {},
    "name": "PriceAggregationsQuery",
    "operationKind": "query",
    "text": "query PriceAggregationsQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    filterArtworksConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM], first: 0) {\n      ...Price_aggregations\n      id\n    }\n    id\n  }\n}\n\nfragment Price_aggregations on FilterArtworksConnection {\n  aggregations {\n    slice\n    counts {\n      name\n      value\n      count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "938d4f8cb2cadde9e8ca3857cf34e60d";

export default node;
