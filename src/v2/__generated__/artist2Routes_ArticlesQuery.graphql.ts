/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type artist2Routes_ArticlesQueryVariables = {
    artistID: string;
};
export type artist2Routes_ArticlesQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistArticlesRoute_artist">;
    } | null;
};
export type artist2Routes_ArticlesQuery = {
    readonly response: artist2Routes_ArticlesQueryResponse;
    readonly variables: artist2Routes_ArticlesQueryVariables;
};



/*
query artist2Routes_ArticlesQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...ArtistArticlesRoute_artist
    id
  }
}

fragment ArtistArticlesRoute_artist on Artist {
  name
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
    "name": "artist2Routes_ArticlesQuery",
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
            "name": "ArtistArticlesRoute_artist"
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
    "name": "artist2Routes_ArticlesQuery",
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
            "name": "name",
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
    "name": "artist2Routes_ArticlesQuery",
    "operationKind": "query",
    "text": "query artist2Routes_ArticlesQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistArticlesRoute_artist\n    id\n  }\n}\n\nfragment ArtistArticlesRoute_artist on Artist {\n  name\n}\n"
  }
};
})();
(node as any).hash = '82fc9b5474cb98fa7f306d5f9ae71a7d';
export default node;
