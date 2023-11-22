/**
 * @generated SignedSource<<f9186902b3e2bd2f5b1ff2091cafbe63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowArtistInput = {
  artistID: string;
  clientMutationId?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type FollowArtistButtonMutation$variables = {
  input: FollowArtistInput;
};
export type FollowArtistButtonMutation$data = {
  readonly followArtist: {
    readonly artist: {
      readonly counts: {
        readonly follows: any | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
    readonly me: {
      readonly counts: {
        readonly followedArtists: number;
      } | null | undefined;
      readonly id: string;
    };
  } | null | undefined;
};
export type FollowArtistButtonMutation = {
  response: FollowArtistButtonMutation$data;
  variables: FollowArtistButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MeCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "followedArtists",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowArtistButtonMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3507348c4ca20298ccf24ea1dff65c12",
    "id": null,
    "metadata": {},
    "name": "FollowArtistButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    me {\n      id\n      counts {\n        followedArtists\n      }\n    }\n    artist {\n      id\n      isFollowed\n      counts {\n        follows\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b11107325e43afd22ac88edc130754ea";

export default node;
