/**
 * @generated SignedSource<<c41321a1e760c24ea9f254910322908b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type HammerPriceIndexAppPuzzleRowQuery$variables = {
  auctionResultId: string;
};
export type HammerPriceIndexAppPuzzleRowQuery$data = {
  readonly auctionResult: {
    readonly artist: {
      readonly name: string | null | undefined;
    } | null | undefined;
    readonly images: {
      readonly larger: {
        readonly cropped: {
          readonly src: string;
          readonly srcSet: string;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly internalID: string;
    readonly priceRealized: {
      readonly centsUSD: number | null | undefined;
    } | null | undefined;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type HammerPriceIndexAppPuzzleRowQuery = {
  response: HammerPriceIndexAppPuzzleRowQuery$data;
  variables: HammerPriceIndexAppPuzzleRowQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auctionResultId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "auctionResultId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotImages",
  "kind": "LinkedField",
  "name": "images",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "larger",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 300
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "larger"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 300
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:300,version:\"larger\",width:300)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "centsUSD",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
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
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/)
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
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuctionResult",
        "kind": "LinkedField",
        "name": "auctionResult",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1d44847ad7b98c244da93e7f75e90e1d",
    "id": null,
    "metadata": {},
    "name": "HammerPriceIndexAppPuzzleRowQuery",
    "operationKind": "query",
    "text": "query HammerPriceIndexAppPuzzleRowQuery(\n  $auctionResultId: String!\n) {\n  auctionResult(id: $auctionResultId) {\n    internalID\n    title\n    artist {\n      name\n      id\n    }\n    images {\n      larger {\n        cropped(width: 300, height: 300, version: \"larger\") {\n          src\n          srcSet\n        }\n      }\n    }\n    priceRealized {\n      centsUSD\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1bc6b4df69712845e3d095c316517793";

export default node;
