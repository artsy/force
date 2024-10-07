/**
 * @generated SignedSource<<c6804d3b129c77a5da6c574e52aa22f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type WorksForYouApp_test_Query$variables = {
  artistSlug: string;
  includeSelectedArtist: boolean;
};
export type WorksForYouApp_test_Query$data = {
  readonly viewerArtist: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerArtist">;
  } | null | undefined;
  readonly viewerFeed: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerFeed">;
  } | null | undefined;
  readonly viewerMe: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerMe">;
  } | null | undefined;
};
export type WorksForYouApp_test_Query = {
  response: WorksForYouApp_test_Query$data;
  variables: WorksForYouApp_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeSelectedArtist"
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
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = {
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
          "value": 80
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 80
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": "resized(height:80,width:80)"
    }
  ],
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 25
},
v9 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v10 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": [
      "IS_FOR_SALE"
    ]
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v16 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v17 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "includeAll",
      "value": false
    }
  ],
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "aspectRatio",
      "storageKey": null
    },
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "placeholder",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v16/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"larger\",\"large\"])"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "versions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blurhashDataURL",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v16/*: any*/),
        {
          "kind": "Literal",
          "name": "width",
          "value": 445
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/),
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
      "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
    }
  ],
  "storageKey": "image(includeAll:false)"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v23 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "CollectorSignals",
  "kind": "LinkedField",
  "name": "collectorSignals",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primaryLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionCollectorSignals",
      "kind": "LinkedField",
      "name": "auction",
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
          "kind": "ScalarField",
          "name": "lotClosesAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "liveBiddingStarted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registrationEndsAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onlineBiddingExtended",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerOfferToCollector",
      "kind": "LinkedField",
      "name": "partnerOffer",
      "plural": false,
      "selections": [
        (v22/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "priceWithDiscount",
          "plural": false,
          "selections": (v23/*: any*/),
          "storageKey": null
        },
        (v12/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v27 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v28 = {
  "alias": null,
  "args": (v27/*: any*/),
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
    (v12/*: any*/)
  ],
  "storageKey": "artist(shallow:true)"
},
v29 = {
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
v30 = {
  "alias": null,
  "args": (v27/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v12/*: any*/),
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": (v27/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    (v22/*: any*/),
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isAuction",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    },
    (v12/*: any*/),
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingPeriodMinutes",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v34 = {
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
    (v22/*: any*/),
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
      "concreteType": "SaleArtworkHighestBid",
      "kind": "LinkedField",
      "name": "highestBid",
      "plural": false,
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v35 = [
  (v3/*: any*/),
  (v12/*: any*/)
],
v36 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v35/*: any*/),
  "storageKey": null
},
v37 = {
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
      "selections": (v35/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUnlisted",
  "storageKey": null
},
v39 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v40 = {
  "alias": "image_title",
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v41 = [
  (v12/*: any*/)
],
v42 = {
  "kind": "InlineFragment",
  "selections": (v41/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v43 = {
  "kind": "Literal",
  "name": "forSale",
  "value": true
},
v44 = [
  (v8/*: any*/),
  (v43/*: any*/),
  (v9/*: any*/)
],
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Viewer"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v48 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdgeInterface"
},
v50 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v52 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CollectorSignals"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionCollectorSignals"
},
v59 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v60 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerOfferToCollector"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v63 = {
  "enumValues": [
    "CURATORS_PICK",
    "INCREASED_INTEREST",
    "PARTNER_OFFER"
  ],
  "nullable": true,
  "plural": false,
  "type": "LabelSignalEnum"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v65 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v69 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v70 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkPriceInsights"
},
v71 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v72 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkMedium"
},
v73 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Gene"
},
v74 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v75 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Sale"
},
v76 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v77 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkCounts"
},
v78 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v79 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkHighestBid"
},
v80 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtworkOpeningBid"
},
v81 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "PageInfo"
},
v82 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Me"
},
v83 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowsAndSaves"
},
v84 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowedArtistsArtworksGroupConnection"
},
v85 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FollowedArtistsArtworksGroupEdge"
},
v86 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowedArtistsArtworksGroup"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "WorksForYouApp_test_Query",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "args": [
                  {
                    "kind": "Variable",
                    "name": "artistSlug",
                    "variableName": "artistSlug"
                  }
                ],
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerArtist"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerFeed"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorksForYouApp_viewerMe"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "WorksForYouApp_test_Query",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "artistSlug"
                  }
                ],
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistCounts",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artworks",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "forSaleArtworks",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
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
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v15/*: any*/),
                                  (v4/*: any*/),
                                  (v2/*: any*/),
                                  (v17/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v20/*: any*/),
                                  (v21/*: any*/),
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v30/*: any*/),
                                  (v31/*: any*/),
                                  (v32/*: any*/),
                                  (v33/*: any*/),
                                  (v34/*: any*/),
                                  (v36/*: any*/),
                                  (v37/*: any*/),
                                  (v38/*: any*/),
                                  (v39/*: any*/),
                                  (v40/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v42/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArtworkConnectionInterface",
                        "abstractKey": "__isArtworkConnectionInterface"
                      }
                    ],
                    "storageKey": "artworksConnection(filter:[\"IS_FOR_SALE\"],first:25,sort:\"PUBLISHED_AT_DESC\")"
                  },
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "filters": [
                      "sort",
                      "filter"
                    ],
                    "handle": "connection",
                    "key": "WorksForYouArtistFeed_artworksConnection",
                    "kind": "LinkedHandle",
                    "name": "artworksConnection"
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
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
                    "concreteType": "FollowsAndSaves",
                    "kind": "LinkedField",
                    "name": "followsAndSaves",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": (v44/*: any*/),
                        "concreteType": "FollowedArtistsArtworksGroupConnection",
                        "kind": "LinkedField",
                        "name": "bundledArtworksByArtistConnection",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroupEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "FollowedArtistsArtworksGroup",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v12/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "summary",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artists",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM DD"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "publishedAt",
                                    "storageKey": "publishedAt(format:\"MMM DD\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ArtworkConnection",
                                    "kind": "LinkedField",
                                    "name": "artworksConnection",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": null,
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              (v13/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Artwork",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v12/*: any*/),
                                                  (v15/*: any*/),
                                                  (v4/*: any*/),
                                                  (v2/*: any*/),
                                                  (v17/*: any*/),
                                                  (v18/*: any*/),
                                                  (v19/*: any*/),
                                                  (v20/*: any*/),
                                                  (v21/*: any*/),
                                                  (v24/*: any*/),
                                                  (v25/*: any*/),
                                                  (v26/*: any*/),
                                                  (v28/*: any*/),
                                                  (v29/*: any*/),
                                                  (v30/*: any*/),
                                                  (v31/*: any*/),
                                                  (v32/*: any*/),
                                                  (v33/*: any*/),
                                                  (v34/*: any*/),
                                                  (v36/*: any*/),
                                                  (v37/*: any*/),
                                                  (v38/*: any*/),
                                                  (v39/*: any*/),
                                                  (v40/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v42/*: any*/)
                                            ],
                                            "storageKey": null
                                          }
                                        ],
                                        "type": "ArtworkConnectionInterface",
                                        "abstractKey": "__isArtworkConnectionInterface"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v7/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "bundledArtworksByArtistConnection(first:25,forSale:true,sort:\"PUBLISHED_AT_DESC\")"
                      },
                      {
                        "alias": null,
                        "args": (v44/*: any*/),
                        "filters": [
                          "sort",
                          "forSale"
                        ],
                        "handle": "connection",
                        "key": "WorksForYouFeed_bundledArtworksByArtistConnection",
                        "kind": "LinkedHandle",
                        "name": "bundledArtworksByArtistConnection"
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
                "concreteType": "FollowsAndSaves",
                "kind": "LinkedField",
                "name": "followsAndSaves",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 99
                      }
                    ],
                    "concreteType": "FollowArtistConnection",
                    "kind": "LinkedField",
                    "name": "artistsConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowArtistEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowArtist",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artist",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v15/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artistsConnection(first:99)"
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1
                      },
                      (v43/*: any*/)
                    ],
                    "concreteType": "FollowedArtistsArtworksGroupConnection",
                    "kind": "LinkedField",
                    "name": "bundledArtworksByArtistConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FollowedArtistsArtworksGroupEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroup",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": (v41/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "bundledArtworksByArtistConnection(first:1,forSale:true)"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "956e94a35458529653348510c022e218",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewerArtist": (v45/*: any*/),
        "viewerArtist.artist": (v46/*: any*/),
        "viewerArtist.artist.artworksConnection": (v47/*: any*/),
        "viewerArtist.artist.artworksConnection.__isArtworkConnectionInterface": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges": (v49/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__isNode": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__typename": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.cursor": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node": (v51/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.__typename": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist": (v46/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.targetSupply": (v52/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.targetSupply.isP1": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artistNames": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists": (v55/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.href": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.name": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.name": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectingInstitution": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals": (v57/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction": (v58/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction.bidCount": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.partnerOffer": (v61/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.partnerOffer.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v62/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collectorSignals.primaryLabel": (v63/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.culturalMaker": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.date": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.href": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.aspectRatio": (v65/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.blurhashDataURL": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.internalID": (v66/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.placeholder": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized": (v67/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.height": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.src": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.srcSet": (v48/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.width": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.url": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.versions": (v69/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.imageTitle": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image_title": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.internalID": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.isUnlisted": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_biddable": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.marketPriceInsights": (v70/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.marketPriceInsights.demandRank": (v71/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType": (v72/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene": (v73/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene.name": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner": (v74/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.href": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.name": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale": (v75/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.display_timely_at": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.endAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.isAuction": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.isClosed": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_preview": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.startAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork": (v76/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.counts": (v77/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.counts.bidderPositions": (v78/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.endAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.formattedEndDateTime": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.highestBid": (v79/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.highestBid.display": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.id": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.lotID": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.lotLabel": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.openingBid": (v80/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.openingBid.display": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleMessage": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.slug": (v50/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.title": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo": (v81/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.endCursor": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.hasNextPage": (v60/*: any*/),
        "viewerArtist.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewerArtist.artist.counts.artworks": (v78/*: any*/),
        "viewerArtist.artist.counts.forSaleArtworks": (v78/*: any*/),
        "viewerArtist.artist.href": (v54/*: any*/),
        "viewerArtist.artist.id": (v50/*: any*/),
        "viewerArtist.artist.image": (v64/*: any*/),
        "viewerArtist.artist.image.resized": (v67/*: any*/),
        "viewerArtist.artist.image.resized.src": (v48/*: any*/),
        "viewerArtist.artist.image.resized.srcSet": (v48/*: any*/),
        "viewerArtist.artist.internalID": (v50/*: any*/),
        "viewerArtist.artist.name": (v54/*: any*/),
        "viewerFeed": (v45/*: any*/),
        "viewerFeed.me": (v82/*: any*/),
        "viewerFeed.me.followsAndSaves": (v83/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection": (v84/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v85/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.cursor": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v86/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.__typename": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artists": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection": (v47/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.__isArtworkConnectionInterface": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges": (v49/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__isNode": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__typename": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node": (v51/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist": (v46/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.targetSupply": (v52/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.targetSupply.isP1": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artistNames": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists": (v55/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.href": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.name": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.name": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectingInstitution": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals": (v57/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction": (v58/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction.bidCount": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.partnerOffer": (v61/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.partnerOffer.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v62/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collectorSignals.primaryLabel": (v63/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.culturalMaker": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.date": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.href": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.aspectRatio": (v65/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.blurhashDataURL": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.internalID": (v66/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.placeholder": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized": (v67/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.height": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.src": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.srcSet": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.width": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.url": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.versions": (v69/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.imageTitle": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image_title": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.internalID": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.isUnlisted": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_biddable": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.marketPriceInsights": (v70/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.marketPriceInsights.demandRank": (v71/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType": (v72/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene": (v73/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.name": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner": (v74/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.href": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.name": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale": (v75/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.display_timely_at": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.endAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.isAuction": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.isClosed": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_preview": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.startAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork": (v76/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.counts": (v77/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.counts.bidderPositions": (v78/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.endAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.formattedEndDateTime": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.highestBid": (v79/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.highestBid.display": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.lotID": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.lotLabel": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.openingBid": (v80/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.openingBid.display": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleMessage": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.slug": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.title": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.href": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v50/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized": (v67/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.src": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.srcSet": (v48/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.publishedAt": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.summary": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo": (v81/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.endCursor": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.hasNextPage": (v60/*: any*/),
        "viewerFeed.me.id": (v50/*: any*/),
        "viewerMe": (v45/*: any*/),
        "viewerMe.me": (v82/*: any*/),
        "viewerMe.me.followsAndSaves": (v83/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowArtistConnection"
        },
        "viewerMe.me.followsAndSaves.artistsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "FollowArtistEdge"
        },
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FollowArtist"
        },
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist": (v46/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.id": (v50/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.name": (v54/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.slug": (v50/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.id": (v50/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.totalCount": (v68/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection": (v84/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v85/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v86/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v50/*: any*/),
        "viewerMe.me.id": (v50/*: any*/)
      }
    },
    "name": "WorksForYouApp_test_Query",
    "operationKind": "query",
    "text": "query WorksForYouApp_test_Query(\n  $includeSelectedArtist: Boolean!\n  $artistSlug: String!\n) {\n  viewerArtist: viewer {\n    ...WorksForYouApp_viewerArtist_1H2h5M @include(if: $includeSelectedArtist)\n  }\n  viewerFeed: viewer {\n    ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)\n  }\n  viewerMe: viewer {\n    ...WorksForYouApp_viewerMe\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_13vYwd\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  saleMessage\n  culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isAuction\n    isClosed\n    id\n  }\n  saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidderPositions\n    }\n    highestBid {\n      display\n    }\n    openingBid {\n      display\n    }\n    id\n  }\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork_13vYwd on Artwork {\n  ...Metadata_artwork_1ZRKfT\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork_1ZRKfT\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork_1ZRKfT on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n}\n\nfragment WorksForYouApp_viewerArtist_1H2h5M on Viewer {\n  ...WorksForYouArtistFeed_viewer_1H2h5M\n}\n\nfragment WorksForYouApp_viewerFeed on Viewer {\n  ...WorksForYouFeed_viewer\n}\n\nfragment WorksForYouApp_viewerMe on Viewer {\n  me {\n    followsAndSaves {\n      artistsConnection(first: 99) {\n        totalCount\n        edges {\n          node {\n            artist {\n              name\n              slug\n              id\n            }\n            id\n          }\n        }\n      }\n      bundledArtworksByArtistConnection(first: 1, forSale: true) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouArtistFeed_viewer_1H2h5M on Viewer {\n  artist(id: $artistSlug) {\n    internalID\n    name\n    href\n    counts {\n      artworks\n      forSaleArtworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        src\n        srcSet\n      }\n    }\n    artworksConnection(sort: PUBLISHED_AT_DESC, first: 25, filter: [IS_FOR_SALE]) {\n      ...ArtworkGrid_artworks\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouFeed_viewer on Viewer {\n  me {\n    followsAndSaves {\n      bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 25, forSale: true) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                src\n                srcSet\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f5e36c15c4692eb45b576053791a919";

export default node;
