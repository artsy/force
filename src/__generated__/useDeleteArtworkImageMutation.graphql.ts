/**
 * @generated SignedSource<<9775a2c9aa2f6526a57c02e3eae734c3>>
 * @relayHash 8cb8ab2a2c63f2fc55bcff23c2e41fd4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 8cb8ab2a2c63f2fc55bcff23c2e41fd4

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteArtworkImageInput = {
  artworkID: string;
  clientMutationId?: string | null | undefined;
  imageID: string;
};
export type useDeleteArtworkImageMutation$variables = {
  input: DeleteArtworkImageInput;
};
export type useDeleteArtworkImageMutation$data = {
  readonly deleteArtworkImage: {
    readonly artworkOrError: {
      readonly mutationError?: {
        readonly message: string;
      } | null | undefined;
      readonly success?: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useDeleteArtworkImageMutation = {
  response: useDeleteArtworkImageMutation$data;
  variables: useDeleteArtworkImageMutation$variables;
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
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "success",
      "storageKey": null
    }
  ],
  "type": "ArtworkMutationDeleteSuccess",
  "abstractKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtworkMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteArtworkImageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteArtworkImagePayload",
        "kind": "LinkedField",
        "name": "deleteArtworkImage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
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
    "name": "useDeleteArtworkImageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteArtworkImagePayload",
        "kind": "LinkedField",
        "name": "deleteArtworkImage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "8cb8ab2a2c63f2fc55bcff23c2e41fd4",
    "metadata": {},
    "name": "useDeleteArtworkImageMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3246345f0e61e291bc377aa19f38b8a7";

export default node;
