/**
 * @generated SignedSource<<859c402c5b47dcf6b0bdfe7076b5bc84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyBids_Test_Query$variables = Record<PropertyKey, never>;
export type MyBids_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"MyBids_me">;
  } | null | undefined;
};
export type MyBids_Test_Query = {
  response: MyBids_Test_Query$data;
  variables: MyBids_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v12 = {
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
    "name": "MyBids_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyBids_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyBids_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MyBids",
            "kind": "LinkedField",
            "name": "myBids",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MyBid",
                "kind": "LinkedField",
                "name": "active",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 100
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "source",
                                  "wide",
                                  "large_rectangle"
                                ]
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 330
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": "cropped(height:100,version:[\"source\",\"wide\",\"large_rectangle\"],width:330)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
                    "kind": "LinkedField",
                    "name": "saleArtworks",
                    "plural": true,
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
                                  (v1/*: any*/),
                                  (v2/*: any*/),
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
                          (v4/*: any*/)
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
                        "selections": (v5/*: any*/),
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
                            "selections": (v5/*: any*/),
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
                      (v0/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "20a1daa2edbe576e726062ce2fb65119",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v6/*: any*/),
        "me.myBids": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyBids"
        },
        "me.myBids.active": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MyBid"
        },
        "me.myBids.active.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "me.myBids.active.sale.coverImage": (v7/*: any*/),
        "me.myBids.active.sale.coverImage.cropped": (v8/*: any*/),
        "me.myBids.active.sale.coverImage.cropped.src": (v9/*: any*/),
        "me.myBids.active.sale.coverImage.cropped.srcSet": (v9/*: any*/),
        "me.myBids.active.sale.formattedStartDateTime": (v10/*: any*/),
        "me.myBids.active.sale.id": (v6/*: any*/),
        "me.myBids.active.sale.name": (v10/*: any*/),
        "me.myBids.active.sale.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.myBids.active.sale.partner.id": (v6/*: any*/),
        "me.myBids.active.sale.partner.name": (v10/*: any*/),
        "me.myBids.active.sale.slug": (v6/*: any*/),
        "me.myBids.active.saleArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleArtwork"
        },
        "me.myBids.active.saleArtworks.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.myBids.active.saleArtworks.artwork.artistNames": (v10/*: any*/),
        "me.myBids.active.saleArtworks.artwork.id": (v6/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image": (v7/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.cropped": (v8/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.cropped.height": (v11/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.cropped.src": (v9/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.cropped.srcSet": (v9/*: any*/),
        "me.myBids.active.saleArtworks.artwork.image.cropped.width": (v11/*: any*/),
        "me.myBids.active.saleArtworks.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "me.myBids.active.saleArtworks.currentBid.display": (v10/*: any*/),
        "me.myBids.active.saleArtworks.estimate": (v10/*: any*/),
        "me.myBids.active.saleArtworks.id": (v6/*: any*/),
        "me.myBids.active.saleArtworks.internalID": (v6/*: any*/),
        "me.myBids.active.saleArtworks.isHighestBidder": (v12/*: any*/),
        "me.myBids.active.saleArtworks.isWatching": (v12/*: any*/),
        "me.myBids.active.saleArtworks.lotLabel": (v10/*: any*/),
        "me.myBids.active.saleArtworks.lotState": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CausalityLotState"
        },
        "me.myBids.active.saleArtworks.lotState.bidCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "me.myBids.active.saleArtworks.lotState.sellingPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.myBids.active.saleArtworks.lotState.sellingPrice.display": (v10/*: any*/),
        "me.myBids.active.saleArtworks.slug": (v6/*: any*/)
      }
    },
    "name": "MyBids_Test_Query",
    "operationKind": "query",
    "text": "query MyBids_Test_Query {\n  me {\n    ...MyBids_me\n    id\n  }\n}\n\nfragment MyBidsBidHeader_sale on Sale {\n  coverImage {\n    cropped(width: 330, height: 100, version: [\"source\", \"wide\", \"large_rectangle\"]) {\n      src\n      srcSet\n    }\n  }\n  formattedStartDateTime\n  name\n  partner {\n    name\n    id\n  }\n  slug\n}\n\nfragment MyBidsBidItem_saleArtwork on SaleArtwork {\n  artwork {\n    artistNames\n    image {\n      cropped(width: 55, height: 55) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    id\n  }\n  estimate\n  currentBid {\n    display\n  }\n  internalID\n  isHighestBidder\n  isWatching\n  lotState {\n    bidCount\n    sellingPrice {\n      display\n    }\n  }\n  lotLabel\n  slug\n}\n\nfragment MyBids_me on Me {\n  myBids {\n    active {\n      sale {\n        slug\n        ...MyBidsBidHeader_sale\n        id\n      }\n      saleArtworks {\n        ...MyBidsBidItem_saleArtwork\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d73525e93af1b239024242559ac1cec8";

export default node;
