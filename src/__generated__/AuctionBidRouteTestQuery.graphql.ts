/**
 * @generated SignedSource<<0f541a525b173287af4b337854a2f326>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBidRouteTestQuery$variables = Record<PropertyKey, never>;
export type AuctionBidRouteTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_artwork">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_me">;
  } | null | undefined;
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_sale">;
  } | null | undefined;
};
export type AuctionBidRouteTestQuery = {
  response: AuctionBidRouteTestQuery$data;
  variables: AuctionBidRouteTestQuery$variables;
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
  "name": "slug",
  "storageKey": null
},
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
  "name": "endAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Bidder"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionBidRouteTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionBidRoute_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      },
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
            "name": "AuctionBidRoute_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionBidRoute_sale"
          }
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AuctionBidRouteTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cascadingEndTimeIntervalMinutes",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedStartDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extendedBiddingEndAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lotID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Sale",
                "kind": "LinkedField",
                "name": "sale",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingPeriodMinutes",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingIntervalMinutes",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "bidder",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
                        "storageKey": null
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endedAt",
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidderPositions",
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
                "concreteType": "SaleArtworkCurrentBid",
                "kind": "LinkedField",
                "name": "currentBid",
                "plural": false,
                "selections": [
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedEndDateTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "artwork",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "date",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
                            "value": 150
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "medium"
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 150
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
                        "storageKey": "resized(height:150,version:\"medium\",width:150)"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "imageUrl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "artistNames",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkMinimumNextBid",
                "kind": "LinkedField",
                "name": "minimumNextBid",
                "plural": false,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "useMyMaxBid",
                    "value": true
                  }
                ],
                "concreteType": "BidIncrementsFormatted",
                "kind": "LinkedField",
                "name": "increments",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": "increments(useMyMaxBid:true)"
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasQualifiedCreditCards",
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v1/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": "sale(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "4560108568cc355731ddaace511ec7ef",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v8/*: any*/),
        "artwork.id": (v9/*: any*/),
        "artwork.internalID": (v9/*: any*/),
        "artwork.sale": (v10/*: any*/),
        "artwork.sale.cascadingEndTimeIntervalMinutes": (v11/*: any*/),
        "artwork.sale.endAt": (v12/*: any*/),
        "artwork.sale.id": (v9/*: any*/),
        "artwork.sale.isClosed": (v13/*: any*/),
        "artwork.sale.liveStartAt": (v12/*: any*/),
        "artwork.sale.startAt": (v12/*: any*/),
        "artwork.saleArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artwork.saleArtwork.artwork": (v8/*: any*/),
        "artwork.saleArtwork.artwork.artistNames": (v12/*: any*/),
        "artwork.saleArtwork.artwork.date": (v12/*: any*/),
        "artwork.saleArtwork.artwork.id": (v9/*: any*/),
        "artwork.saleArtwork.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artwork.saleArtwork.artwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "artwork.saleArtwork.artwork.image.resized.height": (v11/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.src": (v14/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.srcSet": (v14/*: any*/),
        "artwork.saleArtwork.artwork.image.resized.width": (v11/*: any*/),
        "artwork.saleArtwork.artwork.imageUrl": (v12/*: any*/),
        "artwork.saleArtwork.artwork.internalID": (v9/*: any*/),
        "artwork.saleArtwork.artwork.slug": (v9/*: any*/),
        "artwork.saleArtwork.artwork.title": (v12/*: any*/),
        "artwork.saleArtwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artwork.saleArtwork.counts.bidderPositions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artwork.saleArtwork.currentBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCurrentBid"
        },
        "artwork.saleArtwork.currentBid.display": (v12/*: any*/),
        "artwork.saleArtwork.endAt": (v12/*: any*/),
        "artwork.saleArtwork.endedAt": (v12/*: any*/),
        "artwork.saleArtwork.extendedBiddingEndAt": (v12/*: any*/),
        "artwork.saleArtwork.formattedEndDateTime": (v12/*: any*/),
        "artwork.saleArtwork.formattedStartDateTime": (v12/*: any*/),
        "artwork.saleArtwork.id": (v9/*: any*/),
        "artwork.saleArtwork.increments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BidIncrementsFormatted"
        },
        "artwork.saleArtwork.increments.cents": (v15/*: any*/),
        "artwork.saleArtwork.increments.display": (v12/*: any*/),
        "artwork.saleArtwork.lotID": (v12/*: any*/),
        "artwork.saleArtwork.lotLabel": (v12/*: any*/),
        "artwork.saleArtwork.minimumNextBid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkMinimumNextBid"
        },
        "artwork.saleArtwork.minimumNextBid.cents": (v15/*: any*/),
        "artwork.saleArtwork.sale": (v10/*: any*/),
        "artwork.saleArtwork.sale.bidder": (v16/*: any*/),
        "artwork.saleArtwork.sale.bidder.id": (v9/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingIntervalMinutes": (v11/*: any*/),
        "artwork.saleArtwork.sale.extendedBiddingPeriodMinutes": (v11/*: any*/),
        "artwork.saleArtwork.sale.id": (v9/*: any*/),
        "artwork.saleArtwork.sale.internalID": (v9/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus": (v16/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus.id": (v9/*: any*/),
        "artwork.saleArtwork.sale.registrationStatus.qualifiedForBidding": (v13/*: any*/),
        "artwork.saleArtwork.sale.slug": (v9/*: any*/),
        "artwork.saleArtwork.sale.startAt": (v12/*: any*/),
        "artwork.slug": (v9/*: any*/),
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.hasQualifiedCreditCards": (v13/*: any*/),
        "me.id": (v9/*: any*/),
        "me.internalID": (v9/*: any*/),
        "sale": (v10/*: any*/),
        "sale.id": (v9/*: any*/),
        "sale.internalID": (v9/*: any*/),
        "sale.slug": (v9/*: any*/)
      }
    },
    "name": "AuctionBidRouteTestQuery",
    "operationKind": "query",
    "text": "query AuctionBidRouteTestQuery {\n  artwork(id: \"foo\") {\n    ...AuctionBidRoute_artwork\n    id\n  }\n  me {\n    ...AuctionBidRoute_me\n    id\n  }\n  sale(id: \"foo\") {\n    ...AuctionBidRoute_sale\n    id\n  }\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    endedAt\n    id\n  }\n}\n\nfragment AuctionBidRoute_artwork on Artwork {\n  slug\n  internalID\n  ...ArtworkSidebarAuctionTimer_artwork\n  saleArtwork {\n    ...AuctionLotInfo_saleArtwork_1WWOz5\n    minimumNextBid {\n      cents\n    }\n    increments(useMyMaxBid: true) {\n      cents\n      display\n    }\n    sale {\n      internalID\n      bidder {\n        id\n      }\n      slug\n      registrationStatus {\n        qualifiedForBidding\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment AuctionBidRoute_me on Me {\n  internalID\n  hasQualifiedCreditCards\n}\n\nfragment AuctionBidRoute_sale on Sale {\n  internalID\n  slug\n}\n\nfragment AuctionLotInfo_saleArtwork_1WWOz5 on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n  formattedEndDateTime\n  artwork {\n    internalID\n    date\n    title\n    image {\n      resized(width: 150, height: 150, version: \"medium\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    imageUrl\n    artistNames\n    slug\n    id\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  extendedBiddingEndAt\n  lotID\n  sale {\n    startAt\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    internalID\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c80a8ec15e7480451328049e27c4fe59";

export default node;
