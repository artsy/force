/**
 * @generated SignedSource<<06fb5a79de51691c46590e3fae08b1de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndexTestQuery$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkDemandIndexTestQuery$data = {
  readonly artwork: {
    readonly marketPriceInsights: {
      readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights">;
    } | null | undefined;
  } | null | undefined;
};
export type MyCollectionArtworkDemandIndexTestQuery = {
  response: MyCollectionArtworkDemandIndexTestQuery$data;
  variables: MyCollectionArtworkDemandIndexTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-ID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkDemandIndexTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MyCollectionArtworkDemandIndex_marketPriceInsights"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"artwork-ID\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkDemandIndexTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkPriceInsights",
            "kind": "LinkedField",
            "name": "marketPriceInsights",
            "plural": false,
            "selections": [
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
                "name": "demandRankDisplayText",
                "storageKey": null
              }
            ],
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
        "storageKey": "artwork(id:\"artwork-ID\")"
      }
    ]
  },
  "params": {
    "cacheID": "83dcc9a0e94ce6d58226825bbdaa8475",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artwork.marketPriceInsights.demandRankDisplayText": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "MyCollectionArtworkDemandIndexTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkDemandIndexTestQuery {\n  artwork(id: \"artwork-ID\") {\n    marketPriceInsights {\n      ...MyCollectionArtworkDemandIndex_marketPriceInsights\n    }\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n"
  }
};
})();

(node as any).hash = "7121f0cff6104b5586ec27d63da30ef1";

export default node;
