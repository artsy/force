/**
 * @generated SignedSource<<d0d7ade0dca0cf774ee86636bbf5afcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveArtworkInput = {
  artworkID?: string | null;
  clientMutationId?: string | null;
  remove?: boolean | null;
};
export type SaveArtworkMutation$variables = {
  input: SaveArtworkInput;
};
export type SaveArtworkMutation$data = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly is_saved: boolean | null;
      readonly slug: string;
    } | null;
    readonly me: {
      readonly counts: {
        readonly savedArtworks: number;
      } | null;
      readonly id: string;
    };
  } | null;
};
export type SaveArtworkMutation$rawResponse = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly is_saved: boolean | null;
      readonly slug: string;
    } | null;
    readonly me: {
      readonly counts: {
        readonly savedArtworks: number;
      } | null;
      readonly id: string;
    };
  } | null;
};
export type SaveArtworkMutation = {
  rawResponse: SaveArtworkMutation$rawResponse;
  response: SaveArtworkMutation$data;
  variables: SaveArtworkMutation$variables;
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
    "concreteType": "SaveArtworkPayload",
    "kind": "LinkedField",
    "name": "saveArtwork",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
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
                "name": "savedArtworks",
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
    "name": "SaveArtworkMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SaveArtworkMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e1c161c2bef6461948969789def573e6",
    "id": null,
    "metadata": {},
    "name": "SaveArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation SaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      id\n      slug\n      is_saved: isSaved\n    }\n    me {\n      id\n      counts {\n        savedArtworks\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aded6f26298073e6ff6829afbd8d2593";

export default node;
