/**
 * @generated SignedSource<<9e5decd86da5649b5d63ddff289c2d16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DislikeArtworkInput = {
  artworkID: string;
  clientMutationId?: string | null | undefined;
  remove: boolean;
};
export type useDislikeArtworkMutation$variables = {
  input: DislikeArtworkInput;
};
export type useDislikeArtworkMutation$data = {
  readonly dislikeArtwork: {
    readonly artwork: {
      readonly isDisliked: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type useDislikeArtworkMutation = {
  response: useDislikeArtworkMutation$data;
  variables: useDislikeArtworkMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDisliked",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDislikeArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DislikeArtworkPayload",
        "kind": "LinkedField",
        "name": "dislikeArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "artwork",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDislikeArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DislikeArtworkPayload",
        "kind": "LinkedField",
        "name": "dislikeArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "artwork",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8eee1223c96bbb7eede14f840396f967",
    "id": null,
    "metadata": {},
    "name": "useDislikeArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useDislikeArtworkMutation(\n  $input: DislikeArtworkInput!\n) {\n  dislikeArtwork(input: $input) {\n    artwork {\n      isDisliked\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "26ad319c4083e5f2caa141cb66ee6d03";

export default node;
