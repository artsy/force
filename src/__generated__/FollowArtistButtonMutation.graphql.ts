/**
 * @generated SignedSource<<02c794ce8a08b2d4dd7c2e58d02a0feb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type FollowArtistInput = {
  artistID: string;
  clientMutationId?: string | null;
  unfollow?: boolean | null;
};
export type FollowArtistButtonMutation$variables = {
  input: FollowArtistInput;
};
export type FollowArtistButtonMutation$data = {
  readonly followArtist: {
    readonly artist: {
      readonly counts: {
        readonly follows: any | null;
      } | null;
      readonly id: string;
      readonly isFollowed: boolean | null;
    } | null;
  } | null;
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
    "cacheID": "8a079d849d99e95b9c139637e91fc53a",
    "id": null,
    "metadata": {},
    "name": "FollowArtistButtonMutation",
    "operationKind": "mutation",
    "text": "mutation FollowArtistButtonMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      isFollowed\n      counts {\n        follows\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "72cf91568c776907df7dea0194809515";

export default node;
