/**
 * @generated SignedSource<<63a911fd4722f0fe1be72de3b88f9a7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyBidsBidItem_Test_Query$variables = Record<PropertyKey, never>;
export type MyBidsBidItem_Test_Query$data = {
  readonly saleArtwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyBidsBidItem_saleArtwork">;
  } | null | undefined;
};
export type MyBidsBidItem_Test_Query = {
  response: MyBidsBidItem_Test_Query$data;
  variables: MyBidsBidItem_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
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
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyBidsBidItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SaleArtwork",
        "kind": "LinkedField",
        "name": "saleArtwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyBidsBidItem_saleArtwork"
          }
        ],
        "storageKey": "saleArtwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyBidsBidItem_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "SaleArtwork",
        "kind": "LinkedField",
        "name": "saleArtwork",
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
                "name": "artistNames",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 55
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 55
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "cropped(height:55,width:55)"
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "estimate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtworkCurrentBid",
            "kind": "LinkedField",
            "name": "currentBid",
            "plural": false,
            "selections": (v2/*: any*/),
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
            "name": "isHighestBidder",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isWatching",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CausalityLotState",
            "kind": "LinkedField",
            "name": "lotState",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bidCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "sellingPrice",
                "plural": false,
                "selections": (v2/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lotLabel",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "saleArtwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "8ac86c18a9477ec93a5fc8d1e3df0bfc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "saleArtwork.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "saleArtwork.artwork.artistNames": (v3/*: any*/),
        "saleArtwork.artwork.id": (v4/*: any*/),
        "saleArtwork.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "saleArtwork.artwork.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "saleArtwork.artwork.image.cropped.height": (v5/*: any*/),
        "saleArtwork.artwork.image.cropped.src": (v6/*: any*/),
        "saleArtwork.artwork.image.cropped.srcSet": (v6/*: any*/),
        "saleArtwork.artwork.image.cropped.width": (v5/*: any*/),
        "saleArtwork.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "saleArtwork.currentBid.display": (v3/*: any*/),
        "saleArtwork.estimate": (v3/*: any*/),
        "saleArtwork.id": (v4/*: any*/),
        "saleArtwork.internalID": (v4/*: any*/),
        "saleArtwork.isHighestBidder": (v7/*: any*/),
        "saleArtwork.isWatching": (v7/*: any*/),
        "saleArtwork.lotLabel": (v3/*: any*/),
        "saleArtwork.lotState": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CausalityLotState"
        },
        "saleArtwork.lotState.bidCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "saleArtwork.lotState.sellingPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "saleArtwork.lotState.sellingPrice.display": (v3/*: any*/),
        "saleArtwork.slug": (v4/*: any*/)
      }
    },
    "name": "MyBidsBidItem_Test_Query",
    "operationKind": "query",
    "text": "query MyBidsBidItem_Test_Query {\n  saleArtwork(id: \"foo\") {\n    ...MyBidsBidItem_saleArtwork\n    id\n  }\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      cropped(width: 55, height: 55) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n"
  }
};
})();

(node as any).hash = "98a4cc76d8e7d26934b94ab456ae5355";

export default node;
