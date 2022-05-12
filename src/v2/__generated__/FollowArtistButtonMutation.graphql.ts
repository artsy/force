/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FollowArtistInput = {
    artistID: string;
    clientMutationId?: string | null | undefined;
    unfollow?: boolean | null | undefined;
};
export type FollowArtistButtonMutationVariables = {
    input: FollowArtistInput;
};
export type FollowArtistButtonMutationResponse = {
    readonly followArtist: {
        readonly artist: {
            readonly id: string;
            readonly slug: string;
            readonly is_followed: boolean | null;
            readonly counts: {
                readonly follows: number | null;
            } | null;
        } | null;
    } | null;
};
export type FollowArtistButtonMutation = {
    readonly response: FollowArtistButtonMutationResponse;
    readonly variables: FollowArtistButtonMutationVariables;
};



/*
mutation FollowArtistButtonMutation(
  $input: FollowArtistInput!
) {
  followArtist(input: $input) {
    artist {
      id
      slug
      is_followed: isFollowed
      counts {
        follows
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "FollowArtistPayload",
    "kind": "LinkedField",
    "name": "followArtist",
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
            "name": "id",
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
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
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
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowArtistButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowArtistButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "11f15ef7b2c9a5bc9feae01fe5b9e56e",
    "id": null,
    "metadata": {},
    "name": "FollowArtistButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      slug\n      is_followed: isFollowed\n      counts {\n        follows\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '63005133474b3c70e897441c947a1bab';
export default node;
