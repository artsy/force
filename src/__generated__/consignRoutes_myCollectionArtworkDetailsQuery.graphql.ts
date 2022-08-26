/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type consignRoutes_myCollectionArtworkDetailsQueryVariables = {
    id: string;
};
export type consignRoutes_myCollectionArtworkDetailsQueryResponse = {
    readonly myCollectionArtwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkDetails_myCollectionArtwork">;
    } | null;
};
export type consignRoutes_myCollectionArtworkDetailsQuery = {
    readonly response: consignRoutes_myCollectionArtworkDetailsQueryResponse;
    readonly variables: consignRoutes_myCollectionArtworkDetailsQueryVariables;
};



/*
query consignRoutes_myCollectionArtworkDetailsQuery(
  $id: String!
) {
  myCollectionArtwork: artwork(id: $id) {
    ...ArtworkDetails_myCollectionArtwork
    id
  }
}

fragment ArtworkDetails_myCollectionArtwork on Artwork {
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
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
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
    "name": "consignRoutes_myCollectionArtworkDetailsQuery",
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
    "name": "consignRoutes_myCollectionArtworkDetailsQuery",
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
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "internalID",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
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
              (v3/*: any*/)
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
              (v2/*: any*/),
              (v3/*: any*/)
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b2d7dadc9c94c1d4cf679db2a455a5a5",
    "id": null,
    "metadata": {},
    "name": "consignRoutes_myCollectionArtworkDetailsQuery",
    "operationKind": "query",
    "text": "query consignRoutes_myCollectionArtworkDetailsQuery(\n  $id: String!\n) {\n  myCollectionArtwork: artwork(id: $id) {\n    ...ArtworkDetails_myCollectionArtwork\n    id\n  }\n}\n\nfragment ArtworkDetails_myCollectionArtwork on Artwork {\n  artist {\n    internalID\n    name\n    id\n  }\n  location {\n    city\n    country\n    state\n    postalCode\n    id\n  }\n  date\n  title\n  medium\n  attributionClass {\n    name\n    id\n  }\n  editionNumber\n  editionSize\n  height\n  width\n  depth\n  metric\n  provenance\n}\n"
  }
};
})();
(node as any).hash = '178cea76fb2942464e7d0929f3cf95df';
export default node;
