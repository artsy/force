/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyBidsBidItem_Test_QueryVariables = {};
export type MyBidsBidItem_Test_QueryResponse = {
    readonly saleArtwork: {
        readonly " $fragmentRefs": FragmentRefs<"MyBidsBidItem_saleArtwork">;
    } | null;
};
export type MyBidsBidItem_Test_Query = {
    readonly response: MyBidsBidItem_Test_QueryResponse;
    readonly variables: MyBidsBidItem_Test_QueryVariables;
};



/*
query MyBidsBidItem_Test_Query {
  saleArtwork(id: "foo") {
    ...MyBidsBidItem_saleArtwork
    id
  }
}

fragment MyBidsBidItem_saleArtwork on SaleArtwork {
  artwork {
    artistNames
    image {
      resized(width: 55, height: 55) {
        src
        srcSet
      }
    }
    id
  }
  estimate
  currentBid {
    display
  }
  internalID
  isHighestBidder
  isWatching
  lotState {
    bidCount
    sellingPrice {
      display
    }
  }
  lotLabel
  slug
}
*/

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v5 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v6 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v7 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
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
                    "storageKey": "resized(height:55,width:55)"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "saleArtwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.id": (v3/*: any*/),
        "saleArtwork.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.estimate": (v4/*: any*/),
        "saleArtwork.currentBid": {
          "type": "SaleArtworkCurrentBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.internalID": (v5/*: any*/),
        "saleArtwork.isHighestBidder": (v6/*: any*/),
        "saleArtwork.isWatching": (v6/*: any*/),
        "saleArtwork.lotState": {
          "type": "CausalityLotState",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.lotLabel": (v4/*: any*/),
        "saleArtwork.slug": (v5/*: any*/),
        "saleArtwork.artwork.artistNames": (v4/*: any*/),
        "saleArtwork.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.artwork.id": (v3/*: any*/),
        "saleArtwork.currentBid.display": (v4/*: any*/),
        "saleArtwork.lotState.bidCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.lotState.sellingPrice": {
          "type": "Money",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.artwork.image.resized": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "saleArtwork.lotState.sellingPrice.display": (v4/*: any*/),
        "saleArtwork.artwork.image.resized.src": (v7/*: any*/),
        "saleArtwork.artwork.image.resized.srcSet": (v7/*: any*/)
      }
    },
    "name": "MyBidsBidItem_Test_Query",
    "operationKind": "query",
    "text": "query MyBidsBidItem_Test_Query {\n  saleArtwork(id: \"foo\") {\n    ...MyBidsBidItem_saleArtwork\n    id\n  }\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      resized(width: 55, height: 55) {\n        src\n        srcSet\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n"
  }
};
})();
(node as any).hash = '98a4cc76d8e7d26934b94ab456ae5355';
export default node;
