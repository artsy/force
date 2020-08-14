/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistFollowQueryVariables = {
    artistID: string;
};
export type ArtistFollowQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"Follow_artist">;
    } | null;
};
export type ArtistFollowQuery = {
    readonly response: ArtistFollowQueryResponse;
    readonly variables: ArtistFollowQueryVariables;
};



/*
query ArtistFollowQuery(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...Follow_artist
    id
  }
}

fragment Follow_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
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
    "name": "ArtistFollowQuery",
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
            "name": "Follow_artist"
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
    "name": "ArtistFollowQuery",
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
            "name": "id",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
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
    "name": "ArtistFollowQuery",
    "operationKind": "query",
    "text": "query ArtistFollowQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...Follow_artist\n    id\n  }\n}\n\nfragment Follow_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n}\n"
  }
};
})();
(node as any).hash = 'a310b3462684ecffc940c5b8fe99d0e9';
export default node;
