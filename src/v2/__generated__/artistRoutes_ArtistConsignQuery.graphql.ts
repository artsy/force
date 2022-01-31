/**
 * @generated SignedSource<<a28afe24c4fd672841bdc106a7c439d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ArtistConsignQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistConsignQuery$data = {
  readonly artist: {
    readonly targetSupply: {
      readonly isInMicrofunnel: boolean | null;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignRoute_artist">;
  } | null;
};
export type artistRoutes_ArtistConsignQuery = {
  variables: artistRoutes_ArtistConsignQuery$variables;
  response: artistRoutes_ArtistConsignQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInMicrofunnel",
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
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_ArtistConsignQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistConsignRoute_artist"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistTargetSupply",
            "kind": "LinkedField",
            "name": "targetSupply",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "artistRoutes_ArtistConsignQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
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
                "concreteType": "ArtistTargetSupplyMicrofunnel",
                "kind": "LinkedField",
                "name": "microfunnel",
                "plural": false,
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
                                    "alias": "imageURL",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "medium"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"medium\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "height",
                                        "value": 395
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
                                        "name": "width",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "height",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "resized(height:395)"
                                  },
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
                              (v5/*: any*/),
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
                              (v4/*: any*/),
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
                                "args": (v6/*: any*/),
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v5/*: any*/),
                                  (v4/*: any*/),
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
                                "args": (v6/*: any*/),
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v4/*: any*/),
                                  (v5/*: any*/),
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
                                  (v5/*: any*/),
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
                                    "selections": (v7/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "opening_bid",
                                    "args": null,
                                    "concreteType": "SaleArtworkOpeningBid",
                                    "kind": "LinkedField",
                                    "name": "openingBid",
                                    "plural": false,
                                    "selections": (v7/*: any*/),
                                    "storageKey": null
                                  },
                                  (v5/*: any*/)
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
                              }
                            ],
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
                    "concreteType": "TargetSupplyMicrofunnelMetadata",
                    "kind": "LinkedField",
                    "name": "metadata",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "roundedViews",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "roundedUniqueVisitors",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "highestRealized",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "str",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "realized",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "00d99a69e28e782ea479f67e543c99ae",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistConsignQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistConsignQuery(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...ArtistConsignRoute_artist\n    targetSupply {\n      isInMicrofunnel\n    }\n    id\n  }\n}\n\nfragment ArtistConsignFAQ_artist on Artist {\n  href\n}\n\nfragment ArtistConsignHeaderImages_artist on Artist {\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            image {\n              resized(height: 395) {\n                width\n                height\n                url\n              }\n            }\n            ...FillwidthItem_artwork\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistConsignHeader_artist on Artist {\n  ...ArtistConsignHeaderImages_artist\n  name\n  href\n}\n\nfragment ArtistConsignHowToSell_artist on Artist {\n  href\n}\n\nfragment ArtistConsignMarketTrends_artist on Artist {\n  href\n  targetSupply {\n    microfunnel {\n      metadata {\n        highestRealized\n        str\n        realized\n      }\n    }\n  }\n}\n\nfragment ArtistConsignMeta_artist on Artist {\n  name\n  href\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            image {\n              imageURL: url(version: \"medium\")\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistConsignPageViews_artist on Artist {\n  name\n  targetSupply {\n    microfunnel {\n      metadata {\n        roundedViews\n        roundedUniqueVisitors\n      }\n    }\n  }\n}\n\nfragment ArtistConsignRecentlySold_artist on Artist {\n  targetSupply {\n    microfunnel {\n      artworksConnection {\n        edges {\n          node {\n            ...FillwidthItem_artwork\n            realizedPrice\n            id\n          }\n        }\n      }\n    }\n  }\n  name\n}\n\nfragment ArtistConsignRoute_artist on Artist {\n  ...ArtistConsignMeta_artist\n  ...ArtistConsignHeader_artist\n  ...ArtistConsignRecentlySold_artist\n  ...ArtistConsignPageViews_artist\n  ...ArtistConsignMarketTrends_artist\n  ...ArtistConsignHowToSell_artist\n  ...ArtistConsignFAQ_artist\n  ...ArtistConsignSellArt_artist\n}\n\nfragment ArtistConsignSellArt_artist on Artist {\n  href\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FillwidthItem_artwork on Artwork {\n  image {\n    url(version: \"larger\")\n    aspectRatio\n  }\n  imageTitle\n  title\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "1c543ebf7dbaf870dd02b598cb7e94b3";

export default node;
