/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignFromMyCollectionRoutesChildren_myCollectionArtworkQueryVariables = {
    artworkId: string;
};
export type consignFromMyCollectionRoutesChildren_myCollectionArtworkQueryResponse = {
    readonly myCollectionArtwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_myCollectionArtwork">;
    } | null;
};
export type consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery = {
    readonly response: consignFromMyCollectionRoutesChildren_myCollectionArtworkQueryResponse;
    readonly variables: consignFromMyCollectionRoutesChildren_myCollectionArtworkQueryVariables;
};



/*
query consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery(
  $artworkId: String!
) {
  myCollectionArtwork: artwork(id: $artworkId) {
    ...ArtworkDetails_myCollectionArtwork
    id
  }
}

fragment ArtworkDetails_myCollectionArtwork on Artwork {
  internalID
  artist {
    internalID
    name
    id
  }
  location {
    city
    country
    state
    postalCode
    id
  }
  date
  title
  medium
  attributionClass {
    name
    id
  }
  editionNumber
  editionSize
  height
  width
  depth
  metric
  provenance
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
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
    "name": "consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery",
    "selections": [
      {
        "alias": "myCollectionArtwork",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkDetails_myCollectionArtwork"
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
    "name": "consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery",
    "selections": [
      {
        "alias": "myCollectionArtwork",
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Location",
            "kind": "LinkedField",
            "name": "location",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "postalCode",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
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
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionSize",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "height",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "width",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "depth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "metric",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b9b83ce6277d5aa8d923fb0a6807b7de",
    "id": null,
    "metadata": {},
    "name": "consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery",
    "operationKind": "query",
    "text": "query consignFromMyCollectionRoutesChildren_myCollectionArtworkQuery(\n  $artworkId: String!\n) {\n  myCollectionArtwork: artwork(id: $artworkId) {\n    ...ArtworkDetails_myCollectionArtwork\n    id\n  }\n}\n\nfragment ArtworkDetails_myCollectionArtwork on Artwork {\n  internalID\n  artist {\n    internalID\n    name\n    id\n  }\n  location {\n    city\n    country\n    state\n    postalCode\n    id\n  }\n  date\n  title\n  medium\n  attributionClass {\n    name\n    id\n  }\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  metric\n  provenance\n}\n"
  }
};
})();
(node as any).hash = 'afa434ba6a74d471ea1634ce2abeb56a';
export default node;
