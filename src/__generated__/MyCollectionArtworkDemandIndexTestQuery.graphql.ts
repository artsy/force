/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndexTestQueryVariables = {};
export type MyCollectionArtworkDemandIndexTestQueryResponse = {
    readonly artwork: {
        readonly marketPriceInsights: {
            readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_marketPriceInsights">;
        } | null;
    } | null;
};
export type MyCollectionArtworkDemandIndexTestQuery = {
    readonly response: MyCollectionArtworkDemandIndexTestQueryResponse;
    readonly variables: MyCollectionArtworkDemandIndexTestQueryVariables;
};



/*
query MyCollectionArtworkDemandIndexTestQuery {
  artwork(id: "artwork-ID") {
    marketPriceInsights {
      ...MyCollectionArtworkDemandIndex_marketPriceInsights
    }
    id
  }
}

fragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {
  demandRank
  demandRankDisplayText
}
*/

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
(node as any).hash = '7121f0cff6104b5586ec27d63da30ef1';
export default node;
