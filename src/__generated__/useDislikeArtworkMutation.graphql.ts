/**
 * @generated SignedSource<<7d022bc12fecb54938ff08b1bfc1149a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DislikeArtworkInput = {
  artworkID: string;
  clientMutationId?: string | null;
  remove: boolean;
};
export type useDislikeArtworkMutation$variables = {
  input: DislikeArtworkInput;
};
export type useDislikeArtworkMutation$data = {
  readonly dislikeArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isDisliked: boolean;
      readonly slug: string;
    } | null;
  } | null;
};
export type useDislikeArtworkMutation$rawResponse = {
  readonly dislikeArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isDisliked: boolean;
      readonly slug: string;
    } | null;
  } | null;
};
export type useDislikeArtworkMutation = {
  rawResponse: useDislikeArtworkMutation$rawResponse;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isDisliked",
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
    "name": "useDislikeArtworkMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDislikeArtworkMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4cd7486843452d6b29b94202fdaaf63a",
    "id": null,
    "metadata": {},
    "name": "useDislikeArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useDislikeArtworkMutation(\n  $input: DislikeArtworkInput!\n) {\n  dislikeArtwork(input: $input) {\n    artwork {\n      id\n      slug\n      isDisliked\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7af88c38407460086c50f0e2a57daabb";

export default node;
