/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistFollowArtistButton_Test_QueryVariables = {};
export type ArtistFollowArtistButton_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistFollowArtistButton_artist">;
    } | null;
};
export type ArtistFollowArtistButton_Test_Query = {
    readonly response: ArtistFollowArtistButton_Test_QueryResponse;
    readonly variables: ArtistFollowArtistButton_Test_QueryVariables;
};



/*
query ArtistFollowArtistButton_Test_Query {
  artist(id: "example") {
    ...ArtistFollowArtistButton_artist
    id
  }
}

fragment ArtistFollowArtistButton_artist on Artist {
  internalID
  slug
  name
  isFollowed
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistFollowArtistButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistFollowArtistButton_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistFollowArtistButton_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
            "kind": "ScalarField",
            "name": "isFollowed",
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
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtistFollowArtistButton_Test_Query",
    "operationKind": "query",
    "text": "query ArtistFollowArtistButton_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistFollowArtistButton_artist\n    id\n  }\n}\n\nfragment ArtistFollowArtistButton_artist on Artist {\n  internalID\n  slug\n  name\n  isFollowed\n}\n"
  }
};
})();
(node as any).hash = '533bf335a786cfb14d84c3cbcdb8b170';
export default node;
