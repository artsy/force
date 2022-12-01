/**
 * @generated SignedSource<<80627671d42bb4b504782e78aaa2f0a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtQuizDislikeButtonMutation$variables = {
  artworkID: string;
};
export type ArtQuizDislikeButtonMutation$data = {
  readonly dislikeArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isDisliked: boolean;
    } | null;
  } | null;
};
export type ArtQuizDislikeButtonMutation = {
  response: ArtQuizDislikeButtonMutation$data;
  variables: ArtQuizDislikeButtonMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "artworkID",
            "variableName": "artworkID"
          },
          {
            "kind": "Literal",
            "name": "remove",
            "value": false
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
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
            "name": "isDisliked",
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtQuizDislikeButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtQuizDislikeButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ec3ecdeed439a41ff33aa1c9649e21cb",
    "id": null,
    "metadata": {},
    "name": "ArtQuizDislikeButtonMutation",
    "operationKind": "mutation",
    "text": "mutation ArtQuizDislikeButtonMutation(\n  $artworkID: String!\n) {\n  dislikeArtwork(input: {artworkID: $artworkID, remove: false}) {\n    artwork {\n      isDisliked\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3cf92b9175ee263b406a6876f72ef64a";

export default node;
