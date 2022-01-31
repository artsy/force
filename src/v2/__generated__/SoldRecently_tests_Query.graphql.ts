/**
 * @generated SignedSource<<40e1284dbc5f745a80e9de41d11ab9aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldRecently_tests_Query$variables = {};
export type SoldRecently_tests_Query$data = {
  readonly targetSupply: {
    readonly " $fragmentSpreads": FragmentRefs<"SoldRecently_targetSupply">;
  } | null;
};
export type SoldRecently_tests_Query = {
  variables: SoldRecently_tests_Query$variables;
  response: SoldRecently_tests_Query$data;
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
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
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
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SoldRecently_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TargetSupply",
        "kind": "LinkedField",
        "name": "targetSupply",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SoldRecently_targetSupply"
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
    "name": "SoldRecently_tests_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TargetSupply",
        "kind": "LinkedField",
        "name": "targetSupply",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TargetSupplyMicrofunnelItem",
            "kind": "LinkedField",
            "name": "microfunnel",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
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
                                    "name": "version",
                                    "value": "larger"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:\"larger\")"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "aspectRatio",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageTitle",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          (v0/*: any*/),
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
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "type",
                                "storageKey": null
                              }
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
                              (v2/*: any*/),
                              {
                                "alias": "is_live_open",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isLiveOpen",
                                "storageKey": null
                              },
                              {
                                "alias": "is_open",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isOpen",
                                "storageKey": null
                              },
                              {
                                "alias": "is_preview",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isPreview",
                                "storageKey": null
                              },
                              {
                                "alias": "display_timely_at",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayTimelyAt",
                                "storageKey": null
                              }
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
                                "selections": (v4/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v4/*: any*/),
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "is_inquireable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isInquireable",
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
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "realizedPrice",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "realizedToEstimate",
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d4430d9369d59e0e90bcf0250dce784",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "TargetSupply"
        },
        "targetSupply.microfunnel": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "TargetSupplyMicrofunnelItem"
        },
        "targetSupply.microfunnel.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "targetSupply.microfunnel.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.artists.href": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.artists.id": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.artists.name": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.collecting_institution": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.cultural_maker": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.date": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.href": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.id": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.image.url": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.imageTitle": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.internalID": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.is_biddable": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.is_inquireable": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.is_saved": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.partner.href": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.partner.id": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.partner.name": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.partner.type": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.realizedPrice": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.realizedToEstimate": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.display_timely_at": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.id": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.is_auction": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.is_closed": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.is_live_open": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.is_open": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale.is_preview": (v7/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.id": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.sale_message": (v5/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.slug": (v6/*: any*/),
        "targetSupply.microfunnel.artworksConnection.edges.node.title": (v5/*: any*/)
      }
    },
    "name": "SoldRecently_tests_Query",
    "operationKind": "query",
    "text": "query SoldRecently_tests_Query {\n  targetSupply {\n    ...SoldRecently_targetSupply\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"larger\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SoldRecently_targetSupply on TargetSupply {\n  microfunnel {\n    artworksConnection {\n      edges {\n        node {\n          ...FillwidthItem_artwork\n          realizedPrice\n          realizedToEstimate\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1b9451502c1cfddc76b6d19308d73183";

export default node;
