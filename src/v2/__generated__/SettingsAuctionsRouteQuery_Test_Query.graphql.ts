/**
 * @generated SignedSource<<417e43c281d2293cab372bb760c1a294>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsAuctionsRouteQuery_Test_Query$variables = {};
export type SettingsAuctionsRouteQuery_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsAuctionsRoute_me">;
  } | null;
};
export type SettingsAuctionsRouteQuery_Test_Query = {
  variables: SettingsAuctionsRouteQuery_Test_Query$variables;
  response: SettingsAuctionsRouteQuery_Test_Query$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isLeadingBidder",
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
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
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
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": "sale_message",
            "args": null,
            "kind": "ScalarField",
            "name": "saleMessage",
            "storageKey": null
          },
          {
            "alias": "cultural_maker",
            "args": null,
            "kind": "ScalarField",
            "name": "culturalMaker",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          {
            "alias": "collecting_institution",
            "args": null,
            "kind": "ScalarField",
            "name": "collectingInstitution",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": "partner(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": "is_auction",
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": "is_closed",
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "sale_artwork",
            "args": null,
            "concreteType": "SaleArtwork",
            "kind": "LinkedField",
            "name": "saleArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleArtworkCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": "bidder_positions",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bidderPositions",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "highest_bid",
                "args": null,
                "concreteType": "SaleArtworkHighestBid",
                "kind": "LinkedField",
                "name": "highestBid",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              {
                "alias": "opening_bid",
                "args": null,
                "concreteType": "SaleArtworkOpeningBid",
                "kind": "LinkedField",
                "name": "openingBid",
                "plural": false,
                "selections": (v5/*: any*/),
                "storageKey": null
              },
              (v1/*: any*/)
            ],
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
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 100
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
                "storageKey": "cropped(height:100,width:100)"
              }
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      },
      (v1/*: any*/)
    ],
    "storageKey": null
  }
],
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "LotStanding"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsAuctionsRouteQuery_Test_Query",
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
            "name": "SettingsAuctionsRoute_me"
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
    "name": "SettingsAuctionsRouteQuery_Test_Query",
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
            "alias": "activeLotStandings",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": true
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": "lotStandings(live:true)"
          },
          {
            "alias": "inactiveLotStandings",
            "args": [
              {
                "kind": "Literal",
                "name": "live",
                "value": false
              }
            ],
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": (v6/*: any*/),
            "storageKey": "lotStandings(live:false)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "isAuction",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "registered",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "CREATED_AT_DESC"
              }
            ],
            "concreteType": "SaleRegistrationConnection",
            "kind": "LinkedField",
            "name": "saleRegistrationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SaleRegistrationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleRegistration",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isRegistered",
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
                          (v1/*: any*/),
                          (v4/*: any*/),
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "MMMM D, h:mmA"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": "startAt(format:\"MMMM D, h:mmA\")"
                          },
                          (v0/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isRegistrationClosed",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "saleRegistrationsConnection(first:10,isAuction:true,published:true,registered:false,sort:\"CREATED_AT_DESC\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eda3f047f51900eeb4a2bd640f261306",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.activeLotStandings": (v7/*: any*/),
        "me.activeLotStandings.isLeadingBidder": (v8/*: any*/),
        "me.activeLotStandings.saleArtwork": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork": (v10/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists": (v11/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.href": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.artists.name": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.collecting_institution": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.cultural_maker": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.date": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.href": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image": (v14/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped": (v15/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.src": (v16/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.image.cropped.srcSet": (v16/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner": (v17/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.href": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.partner.name": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale": (v18/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.is_auction": (v8/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale.is_closed": (v8/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork": (v9/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.counts": (v19/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.counts.bidder_positions": (v20/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.highest_bid": (v21/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.highest_bid.display": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.opening_bid": (v22/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_artwork.opening_bid.display": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.sale_message": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.artwork.title": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.lotLabel": (v12/*: any*/),
        "me.activeLotStandings.saleArtwork.sale": (v18/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.id": (v13/*: any*/),
        "me.activeLotStandings.saleArtwork.sale.isClosed": (v8/*: any*/),
        "me.id": (v13/*: any*/),
        "me.inactiveLotStandings": (v7/*: any*/),
        "me.inactiveLotStandings.isLeadingBidder": (v8/*: any*/),
        "me.inactiveLotStandings.saleArtwork": (v9/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork": (v10/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists": (v11/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.href": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.artists.name": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.collecting_institution": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.cultural_maker": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.date": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.href": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image": (v14/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped": (v15/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped.src": (v16/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.image.cropped.srcSet": (v16/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner": (v17/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.href": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.partner.name": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale": (v18/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.is_auction": (v8/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale.is_closed": (v8/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork": (v9/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.counts": (v19/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.counts.bidder_positions": (v20/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.highest_bid": (v21/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.highest_bid.display": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.opening_bid": (v22/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_artwork.opening_bid.display": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.sale_message": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.artwork.title": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.lotLabel": (v12/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale": (v18/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale.id": (v13/*: any*/),
        "me.inactiveLotStandings.saleArtwork.sale.isClosed": (v8/*: any*/),
        "me.saleRegistrationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleRegistrationConnection"
        },
        "me.saleRegistrationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleRegistrationEdge"
        },
        "me.saleRegistrationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleRegistration"
        },
        "me.saleRegistrationsConnection.edges.node.id": (v13/*: any*/),
        "me.saleRegistrationsConnection.edges.node.isRegistered": (v8/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale": (v18/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.href": (v12/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.id": (v13/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isClosed": (v8/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.isRegistrationClosed": (v8/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.name": (v12/*: any*/),
        "me.saleRegistrationsConnection.edges.node.sale.startAt": (v12/*: any*/)
      }
    },
    "name": "SettingsAuctionsRouteQuery_Test_Query",
    "operationKind": "query",
    "text": "query SettingsAuctionsRouteQuery_Test_Query {\n  me {\n    ...SettingsAuctionsRoute_me\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment SettingsAuctionsLotStanding_lotStanding on LotStanding {\n  isLeadingBidder\n  saleArtwork {\n    lotLabel\n    sale {\n      isClosed\n      id\n    }\n    artwork {\n      ...Details_artwork\n      href\n      image {\n        cropped(height: 100, width: 100) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsAuctionsRoute_me on Me {\n  ...UserActiveBids_me\n  ...UserBidHistory_me\n  ...UserRegistrationAuctions_me\n}\n\nfragment UserActiveBids_me on Me {\n  activeLotStandings: lotStandings(live: true) {\n    ...SettingsAuctionsLotStanding_lotStanding\n  }\n}\n\nfragment UserBidHistory_me on Me {\n  inactiveLotStandings: lotStandings(live: false) {\n    ...SettingsAuctionsLotStanding_lotStanding\n  }\n}\n\nfragment UserRegistrationAuctions_me on Me {\n  saleRegistrationsConnection(published: true, isAuction: true, sort: CREATED_AT_DESC, first: 10, registered: false) {\n    edges {\n      node {\n        isRegistered\n        sale {\n          id\n          name\n          href\n          startAt(format: \"MMMM D, h:mmA\")\n          isClosed\n          isRegistrationClosed\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "40a6dfae10813d606d91b054d59e896d";

export default node;
