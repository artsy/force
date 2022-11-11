/**
 * @generated SignedSource<<a0c11934de17ab73581ff98aa8d5c453>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeNewWorksForYouRail_Test_Query$variables = {};
export type HomeNewWorksForYouRail_Test_Query$data = {
  readonly artworksForUser: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeNewWorksForYouRail_artworksForUser">;
  } | null;
};
export type HomeNewWorksForYouRail_Test_Query = {
  response: HomeNewWorksForYouRail_Test_Query$data;
  variables: HomeNewWorksForYouRail_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  },
  {
    "kind": "Literal",
    "name": "includeBackfill",
    "value": true
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = [
  (v4/*: any*/),
  (v2/*: any*/)
],
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
  "type": "Boolean"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeNewWorksForYouRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworksForUser",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeNewWorksForYouRail_artworksForUser"
          }
        ],
        "storageKey": "artworksForUser(first:20,includeBackfill:true)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "HomeNewWorksForYouRail_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "ArtworkConnection",
        "kind": "LinkedField",
        "name": "artworksForUser",
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
                  (v1/*: any*/),
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
                    "args": null,
                    "concreteType": "Artist",
                    "kind": "LinkedField",
                    "name": "artist",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtistTargetSupply",
                        "kind": "LinkedField",
                        "name": "targetSupply",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isP1",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtworkPriceInsights",
                    "kind": "LinkedField",
                    "name": "marketPriceInsights",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "demandRank",
                        "storageKey": null
                      }
                    ],
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
                      (v2/*: any*/),
                      (v1/*: any*/),
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
                      (v1/*: any*/),
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
                      (v5/*: any*/),
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
                      (v5/*: any*/),
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
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": "opening_bid",
                        "args": null,
                        "concreteType": "SaleArtworkOpeningBid",
                        "kind": "LinkedField",
                        "name": "openingBid",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
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
                    "selections": (v7/*: any*/),
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
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                        "alias": "src",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": [
                              "larger",
                              "large"
                            ]
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": "url(version:[\"larger\",\"large\"])"
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artworksForUser(first:20,includeBackfill:true)"
      }
    ]
  },
  "params": {
    "cacheID": "2661c3427ee4f2d31d16a627259116be",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artworksForUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artworksForUser.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "artworksForUser.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artworksForUser.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artworksForUser.edges.node.artist.id": (v8/*: any*/),
        "artworksForUser.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artworksForUser.edges.node.artist.targetSupply.isP1": (v9/*: any*/),
        "artworksForUser.edges.node.artistNames": (v10/*: any*/),
        "artworksForUser.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artworksForUser.edges.node.artists.href": (v10/*: any*/),
        "artworksForUser.edges.node.artists.id": (v8/*: any*/),
        "artworksForUser.edges.node.artists.name": (v10/*: any*/),
        "artworksForUser.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artworksForUser.edges.node.attributionClass.id": (v8/*: any*/),
        "artworksForUser.edges.node.attributionClass.name": (v10/*: any*/),
        "artworksForUser.edges.node.collecting_institution": (v10/*: any*/),
        "artworksForUser.edges.node.cultural_maker": (v10/*: any*/),
        "artworksForUser.edges.node.date": (v10/*: any*/),
        "artworksForUser.edges.node.href": (v10/*: any*/),
        "artworksForUser.edges.node.id": (v8/*: any*/),
        "artworksForUser.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artworksForUser.edges.node.image.height": (v11/*: any*/),
        "artworksForUser.edges.node.image.src": (v10/*: any*/),
        "artworksForUser.edges.node.image.width": (v11/*: any*/),
        "artworksForUser.edges.node.internalID": (v8/*: any*/),
        "artworksForUser.edges.node.is_saved": (v9/*: any*/),
        "artworksForUser.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artworksForUser.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "artworksForUser.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artworksForUser.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artworksForUser.edges.node.mediumType.filterGene.id": (v8/*: any*/),
        "artworksForUser.edges.node.mediumType.filterGene.name": (v10/*: any*/),
        "artworksForUser.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artworksForUser.edges.node.partner.href": (v10/*: any*/),
        "artworksForUser.edges.node.partner.id": (v8/*: any*/),
        "artworksForUser.edges.node.partner.name": (v10/*: any*/),
        "artworksForUser.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artworksForUser.edges.node.sale.cascadingEndTimeIntervalMinutes": (v11/*: any*/),
        "artworksForUser.edges.node.sale.endAt": (v10/*: any*/),
        "artworksForUser.edges.node.sale.extendedBiddingIntervalMinutes": (v11/*: any*/),
        "artworksForUser.edges.node.sale.id": (v8/*: any*/),
        "artworksForUser.edges.node.sale.is_auction": (v9/*: any*/),
        "artworksForUser.edges.node.sale.is_closed": (v9/*: any*/),
        "artworksForUser.edges.node.sale.startAt": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "artworksForUser.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "artworksForUser.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artworksForUser.edges.node.sale_artwork.endAt": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.extendedBiddingEndAt": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.formattedEndDateTime": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "artworksForUser.edges.node.sale_artwork.highest_bid.display": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.id": (v8/*: any*/),
        "artworksForUser.edges.node.sale_artwork.lotID": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.lotLabel": (v10/*: any*/),
        "artworksForUser.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "artworksForUser.edges.node.sale_artwork.opening_bid.display": (v10/*: any*/),
        "artworksForUser.edges.node.sale_message": (v10/*: any*/),
        "artworksForUser.edges.node.slug": (v8/*: any*/),
        "artworksForUser.edges.node.title": (v10/*: any*/)
      }
    },
    "name": "HomeNewWorksForYouRail_Test_Query",
    "operationKind": "query",
    "text": "query HomeNewWorksForYouRail_Test_Query {\n  artworksForUser(includeBackfill: true, first: 20) {\n    ...HomeNewWorksForYouRail_artworksForUser\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HomeNewWorksForYouRail_artworksForUser on ArtworkConnection {\n  edges {\n    node {\n      internalID\n      slug\n      ...ShelfArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  title\n  href\n  artistNames\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c3fcdeabae66d34870c414f6077c820";

export default node;
