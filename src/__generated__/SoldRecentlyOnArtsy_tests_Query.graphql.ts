/**
 * @generated SignedSource<<2b0147c8e05b836536dd3e6d1268d50e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_tests_Query$variables = {};
export type SoldRecentlyOnArtsy_tests_Query$data = {
  readonly recentlySoldArtworks: {
    readonly " $fragmentSpreads": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
  } | null;
};
export type SoldRecentlyOnArtsy_tests_Query = {
  response: SoldRecentlyOnArtsy_tests_Query$data;
  variables: SoldRecentlyOnArtsy_tests_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "endAt",
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
  (v3/*: any*/),
  (v2/*: any*/)
],
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SoldRecentlyOnArtsy_recentlySoldArtworks"
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
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RecentlySoldArtworkTypeConnection",
        "kind": "LinkedField",
        "name": "recentlySoldArtworks",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "RecentlySoldArtworkTypeEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RecentlySoldArtworkType",
                "kind": "LinkedField",
                "name": "node",
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
                      (v0/*: any*/),
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
                        "args": (v1/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v2/*: any*/),
                          (v0/*: any*/),
                          (v3/*: any*/)
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
                        "args": (v1/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v0/*: any*/),
                          (v2/*: any*/)
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
                          (v4/*: any*/),
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
                            "name": "extendedBiddingIntervalMinutes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": null
                          },
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
                          (v2/*: any*/)
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
                            "kind": "ScalarField",
                            "name": "lotID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v4/*: any*/),
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
                            "name": "formattedEndDateTime",
                            "storageKey": null
                          },
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
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": "is_saved",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSaved",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkMedium",
                        "kind": "LinkedField",
                        "name": "mediumType",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Gene",
                            "kind": "LinkedField",
                            "name": "filterGene",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          }
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
                            "alias": "src",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "normalized",
                                  "larger",
                                  "large"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"normalized\",\"larger\",\"large\"])"
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
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "lowEstimate",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "highEstimate",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "priceRealized",
                    "plural": false,
                    "selections": (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "0e53d12bf7bafe926f18b27aac3d750b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "recentlySoldArtworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkTypeConnection"
        },
        "recentlySoldArtworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "RecentlySoldArtworkTypeEdge"
        },
        "recentlySoldArtworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RecentlySoldArtworkType"
        },
        "recentlySoldArtworks.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "recentlySoldArtworks.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "recentlySoldArtworks.edges.node.artwork.artists.href": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.artists.name": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "recentlySoldArtworks.edges.node.artwork.attributionClass.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.attributionClass.name": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.collecting_institution": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.cultural_maker": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.date": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.href": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "recentlySoldArtworks.edges.node.artwork.image.height": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.src": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.image.width": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.internalID": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.is_saved": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.mediumType.filterGene.name": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "recentlySoldArtworks.edges.node.artwork.partner.href": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.partner.name": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "recentlySoldArtworks.edges.node.artwork.sale.cascadingEndTimeIntervalMinutes": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.endAt": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.extendedBiddingIntervalMinutes": (v9/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_auction": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.is_closed": (v10/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale.startAt": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.endAt": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.extendedBiddingEndAt": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.formattedEndDateTime": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.highest_bid.display": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.id": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotID": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.lotLabel": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "recentlySoldArtworks.edges.node.artwork.sale_artwork.opening_bid.display": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.sale_message": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.slug": (v8/*: any*/),
        "recentlySoldArtworks.edges.node.artwork.title": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.highEstimate.display": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.lowEstimate.display": (v7/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized": (v11/*: any*/),
        "recentlySoldArtworks.edges.node.priceRealized.display": (v7/*: any*/)
      }
    },
    "name": "SoldRecentlyOnArtsy_tests_Query",
    "operationKind": "query",
    "text": "query SoldRecentlyOnArtsy_tests_Query {\n  recentlySoldArtworks {\n    ...SoldRecentlyOnArtsy_recentlySoldArtworks\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  title\n  href\n  image {\n    src: url(version: [\"normalized\", \"larger\", \"large\"])\n    width\n    height\n  }\n}\n\nfragment SoldRecentlyOnArtsy_recentlySoldArtworks on RecentlySoldArtworkTypeConnection {\n  edges {\n    node {\n      artwork {\n        ...ShelfArtwork_artwork\n        slug\n        href\n        internalID\n        id\n      }\n      lowEstimate {\n        display\n      }\n      highEstimate {\n        display\n      }\n      priceRealized {\n        display\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "442ff54b073be1549339a7f7e4ad3479";

export default node;
