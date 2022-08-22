/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkDemandIndexTestQueryVariables = {};
export type MyCollectionArtworkDemandIndexTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkDemandIndex_artwork">;
    } | null;
};
export type MyCollectionArtworkDemandIndexTestQuery = {
    readonly response: MyCollectionArtworkDemandIndexTestQueryResponse;
    readonly variables: MyCollectionArtworkDemandIndexTestQueryVariables;
};



/*
query MyCollectionArtworkDemandIndexTestQuery {
  artwork(id: "artwork-ID") {
    ...MyCollectionArtworkDemandIndex_artwork
    id
  }
}

fragment MyCollectionArtworkDemandIndex_artwork on Artwork {
  marketPriceInsights {
    demandRank
  }
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkDemandIndex_artwork"
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
    "cacheID": "bb98f93f47b5f26ee5a82e4a41a61b3d",
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
        }
      }
    },
    "name": "MyCollectionArtworkDemandIndexTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkDemandIndexTestQuery {\n  artwork(id: \"artwork-ID\") {\n    ...MyCollectionArtworkDemandIndex_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_artwork on Artwork {\n  marketPriceInsights {\n    demandRank\n  }\n}\n"
  }
};
})();
(node as any).hash = '65b17f8de7e5153c61bfe16008a63c94';
export default node;
