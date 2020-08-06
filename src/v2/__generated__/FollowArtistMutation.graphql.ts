/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    readonly artistID: string;
    readonly clientMutationId?: string | null;
    readonly unfollow?: boolean | null;
};
export type FollowArtistMutationVariables = {
    input: FollowArtistInput;
};
export type FollowArtistMutationResponse = {
    readonly followArtist: {
        readonly artist: {
            readonly id: string;
            readonly is_followed: boolean | null;
        } | null;
    } | null;
};
export type FollowArtistMutation = {
    readonly response: FollowArtistMutationResponse;
    readonly variables: FollowArtistMutationVariables;
};



/*
mutation FollowArtistMutation(
  $input: FollowArtistInput!
) {
  followArtist(input: $input) {
    artist {
      id
      is_followed: isFollowed
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "input",
    "type": "FollowArtistInput!",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "followArtist",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": null,
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": "is_followed",
            "name": "isFollowed",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FollowArtistMutation",
    "type": "Mutation",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "FollowArtistMutation",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "mutation",
    "name": "FollowArtistMutation",
    "id": null,
    "text": "mutation FollowArtistMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      is_followed: isFollowed\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'f380e216ce8a2a395b2b910ea042695a';
export default node;
