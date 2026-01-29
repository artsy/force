/**
 * @generated SignedSource<<0ab574f2233491cc05c3a4e53d819cd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type AuthDialogPanImageQuery$variables = {
  nodeId: string;
};
export type AuthDialogPanImageQuery$data = {
  readonly node: {
    readonly __typename: "Artist";
    readonly coverArtwork: {
      readonly image: {
        readonly aspectRatio: number;
        readonly blurhash: string | null | undefined;
        readonly url: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: "Artwork";
    readonly image: {
      readonly aspectRatio: number;
      readonly blurhash: string | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: "Gene";
    readonly image: {
      readonly aspectRatio: number;
      readonly blurhash: string | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: "Sale";
    readonly coverImage: {
      readonly aspectRatio: number;
      readonly blurhash: string | null | undefined;
      readonly url: string | null | undefined;
    } | null | undefined;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined;
};
export type AuthDialogPanImageQuery = {
  response: AuthDialogPanImageQuery$data;
  variables: AuthDialogPanImageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nodeId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "nodeId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "version",
        "value": "main"
      }
    ],
    "kind": "ScalarField",
    "name": "url",
    "storageKey": "url(version:\"main\")"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "aspectRatio",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "blurhash",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": (v3/*: any*/),
  "storageKey": null
},
v5 = [
  (v4/*: any*/)
],
v6 = {
  "kind": "InlineFragment",
  "selections": (v5/*: any*/),
  "type": "Artwork",
  "abstractKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": (v5/*: any*/),
  "type": "Gene",
  "abstractKey": null
},
v8 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthDialogPanImageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "coverArtwork",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              }
            ],
            "type": "Artist",
            "abstractKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthDialogPanImageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "coverArtwork",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "Artist",
            "abstractKey": null
          },
          (v8/*: any*/),
          (v9/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "757c1966a8adbfd1da8fbb529c9d7c88",
    "id": null,
    "metadata": {},
    "name": "AuthDialogPanImageQuery",
    "operationKind": "query",
    "text": "query AuthDialogPanImageQuery(\n  $nodeId: ID!\n) {\n  node(id: $nodeId) {\n    __typename\n    ... on Artwork {\n      image {\n        url(version: \"main\")\n        aspectRatio\n        blurhash\n      }\n    }\n    ... on Gene {\n      image {\n        url(version: \"main\")\n        aspectRatio\n        blurhash\n      }\n    }\n    ... on Artist {\n      coverArtwork {\n        image {\n          url(version: \"main\")\n          aspectRatio\n          blurhash\n        }\n        id\n      }\n    }\n    ... on Sale {\n      coverImage {\n        url(version: \"main\")\n        aspectRatio\n        blurhash\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4acec9ed0126db4b177eaeb780b68c60";

export default node;
