/**
 * @generated SignedSource<<1d3b75d28db7b7e9967017d4b8154555>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type FollowArtistInput = {
  artistID: string;
  clientMutationId?: string | null | undefined;
  unfollow?: boolean | null | undefined;
};
export type useCommandBarActionsFollowMutation$variables = {
  input: FollowArtistInput;
};
export type useCommandBarActionsFollowMutation$data = {
  readonly followArtist: {
    readonly artist: {
      readonly id: string;
      readonly internalID: string;
      readonly isFollowed: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useCommandBarActionsFollowMutation = {
  response: useCommandBarActionsFollowMutation$data;
  variables: useCommandBarActionsFollowMutation$variables;
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
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
    "name": "useCommandBarActionsFollowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCommandBarActionsFollowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b74ede58d4979c36b67b9f443402fa14",
    "id": null,
    "metadata": {},
    "name": "useCommandBarActionsFollowMutation",
    "operationKind": "mutation",
    "text": "mutation useCommandBarActionsFollowMutation(\n  $input: FollowArtistInput!\n) {\n  followArtist(input: $input) {\n    artist {\n      id\n      internalID\n      isFollowed\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b73c0b978a720466496efd5c035ece3";

export default node;
