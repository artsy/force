/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_OverviewQueryVariables = {
    artistID: string;
};
export type artistRoutes_OverviewQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistOverviewRoute_artist">;
    } | null;
};
export type artistRoutes_OverviewQuery = {
    readonly response: artistRoutes_OverviewQueryResponse;
    readonly variables: artistRoutes_OverviewQueryVariables;
};



/*
query artistRoutes_OverviewQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistOverviewRoute_artist
    id
  }
}

fragment ArtistOverviewRoute_artist on Artist {
  slug
  name
  counts {
    artworks
  }
  internalID
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_OverviewQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistOverviewRoute_artist"
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
    "name": "artistRoutes_OverviewQuery",
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
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
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
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "artistRoutes_OverviewQuery",
    "operationKind": "query",
    "text": "query artistRoutes_OverviewQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistOverviewRoute_artist\n    id\n  }\n}\n\nfragment ArtistOverviewRoute_artist on Artist {\n  slug\n  name\n  counts {\n    artworks\n  }\n  internalID\n}\n"
  }
};
})();
(node as any).hash = 'f2a3f47e12d676a81af105092a6c94cf';
export default node;
