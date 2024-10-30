/**
 * @generated SignedSource<<3da6e017d75d032be1761dce3a5d7b3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveArtworkInput = {
  artworkID?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  remove?: boolean | null | undefined;
};
export type SaveArtworkMutation$variables = {
  input: SaveArtworkInput;
};
export type SaveArtworkMutation$data = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly collectorSignals: {
        readonly auction: {
          readonly lotWatcherCount: number;
        } | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly isSavedToList: boolean;
      readonly slug: string;
    } | null | undefined;
    readonly me: {
      readonly counts: {
        readonly savedArtworks: number;
      } | null | undefined;
      readonly id: string;
    };
  } | null | undefined;
};
export type SaveArtworkMutation$rawResponse = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly collectorSignals: {
        readonly auction: {
          readonly lotWatcherCount: number;
        } | null | undefined;
      } | null | undefined;
      readonly id: string;
      readonly isSavedToList: boolean;
      readonly slug: string;
    } | null | undefined;
    readonly me: {
      readonly counts: {
        readonly savedArtworks: number;
      } | null | undefined;
      readonly id: string;
    };
  } | null | undefined;
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSavedToList",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CollectorSignals",
            "kind": "LinkedField",
            "name": "collectorSignals",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionCollectorSignals",
                "kind": "LinkedField",
                "name": "auction",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotWatcherCount",
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
    "cacheID": "8e7c1c0bd7c7e76a9428ddf4afd48be4",
    "id": null,
    "metadata": {},
    "name": "SaveArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation SaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      id\n      slug\n      isSavedToList\n      collectorSignals {\n        auction {\n          lotWatcherCount\n        }\n      }\n    }\n    me {\n      id\n      counts {\n        savedArtworks\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e16150c8cbf16af273fe3b3ed0ef0aef";

export default node;
