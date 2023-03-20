/**
 * @generated SignedSource<<10011c21952b5dd5833a42887df769f8>>
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
  } | null;
  readonly viewerFeed: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerFeed">;
  } | null;
  readonly viewerMe: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerMe">;
  } | null;
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
  "name": "isInAuction",
  "storageKey": null
},
v23 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v24 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v25 = {
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
    (v12/*: any*/)
  ],
  "storageKey": null
},
v26 = {
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
  "name": "artists",
  "plural": true,
  "selections": [
    (v12/*: any*/),
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v29 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v30 = {
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
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    (v31/*: any*/),
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
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v35 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v36 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v33/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    (v31/*: any*/),
    (v34/*: any*/),
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
      "selections": (v35/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v35/*: any*/),
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": "is_saved",
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v38 = {
  "alias": "preview",
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
          "value": "square"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"square\")"
    }
  ],
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v40 = {
  "alias": "customCollections",
  "args": [
    {
      "kind": "Literal",
      "name": "default",
      "value": false
    },
    {
      "kind": "Literal",
      "name": "first",
      "value": 0
    },
    {
      "kind": "Literal",
      "name": "saves",
      "value": true
    }
  ],
  "concreteType": "CollectionsConnection",
  "kind": "LinkedField",
  "name": "collectionsConnection",
  "plural": false,
  "selections": [
    (v39/*: any*/)
  ],
  "storageKey": "collectionsConnection(default:false,first:0,saves:true)"
},
v41 = [
  (v3/*: any*/),
  (v12/*: any*/)
],
v42 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v41/*: any*/),
  "storageKey": null
},
v43 = {
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
      "selections": (v41/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v44 = {
  "alias": "is_biddable",
  "args": null,
  "kind": "ScalarField",
  "name": "isBiddable",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v31/*: any*/),
    (v34/*: any*/),
    (v33/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": null
},
v46 = {
  "alias": "image_title",
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v47 = [
  (v12/*: any*/)
],
v48 = {
  "kind": "InlineFragment",
  "selections": (v47/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v49 = {
  "kind": "Literal",
  "name": "forSale",
  "value": true
},
v50 = [
  (v8/*: any*/),
  (v49/*: any*/),
  (v9/*: any*/)
],
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Viewer"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkConnection"
},
v54 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "ArtworkEdgeInterface"
},
v56 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistTargetSupply"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AttributionClass"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CollectionsConnection"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v66 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
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
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v83 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Me"
},
v84 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowsAndSaves"
},
v85 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FollowedArtistsArtworksGroupConnection"
},
v86 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "FollowedArtistsArtworksGroupEdge"
},
v87 = {
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
                                  (v22/*: any*/),
                                  (v23/*: any*/),
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v30/*: any*/),
                                  (v32/*: any*/),
                                  (v36/*: any*/),
                                  (v37/*: any*/),
                                  (v38/*: any*/),
                                  (v40/*: any*/),
                                  (v42/*: any*/),
                                  (v43/*: any*/),
                                  (v44/*: any*/),
                                  (v45/*: any*/),
                                  (v46/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v48/*: any*/)
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
                        "args": (v50/*: any*/),
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
                                                  (v22/*: any*/),
                                                  (v23/*: any*/),
                                                  (v24/*: any*/),
                                                  (v25/*: any*/),
                                                  (v26/*: any*/),
                                                  (v28/*: any*/),
                                                  (v29/*: any*/),
                                                  (v30/*: any*/),
                                                  (v32/*: any*/),
                                                  (v36/*: any*/),
                                                  (v37/*: any*/),
                                                  (v38/*: any*/),
                                                  (v40/*: any*/),
                                                  (v42/*: any*/),
                                                  (v43/*: any*/),
                                                  (v44/*: any*/),
                                                  (v45/*: any*/),
                                                  (v46/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v48/*: any*/)
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
                        "args": (v50/*: any*/),
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
                      (v39/*: any*/),
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
                      (v49/*: any*/)
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
                            "selections": (v47/*: any*/),
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
    "cacheID": "c67bfe76b7ecf7e3d1d7e55068a93b92",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewerArtist": (v51/*: any*/),
        "viewerArtist.artist": (v52/*: any*/),
        "viewerArtist.artist.artworksConnection": (v53/*: any*/),
        "viewerArtist.artist.artworksConnection.__isArtworkConnectionInterface": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges": (v55/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__isNode": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.__typename": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.cursor": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node": (v57/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.__typename": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist": (v52/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.targetSupply": (v58/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artist.targetSupply.isP1": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artistNames": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists": (v61/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.href": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.artists.name": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass": (v62/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.attributionClass.name": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.collecting_institution": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.cultural_maker": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.customCollections": (v63/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.customCollections.totalCount": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.date": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.href": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image": (v65/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.aspectRatio": (v66/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.internalID": (v67/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.placeholder": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized": (v68/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.height": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.src": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.srcSet": (v54/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.resized.width": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.url": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image.versions": (v69/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.imageTitle": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.image_title": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.internalID": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.isInAuction": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_biddable": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.is_saved": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.marketPriceInsights": (v70/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.marketPriceInsights.demandRank": (v71/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType": (v72/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene": (v73/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.mediumType.filterGene.name": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner": (v74/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.href": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.partner.name": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.preview": (v65/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.preview.url": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale": (v75/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.display_timely_at": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.endAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v64/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_auction": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_closed": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.is_preview": (v59/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale.startAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork": (v76/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.endAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.saleArtwork.lotID": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork": (v76/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.counts": (v77/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v78/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.endAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.highest_bid": (v79/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.id": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.lotID": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.lotLabel": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.opening_bid": (v80/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.sale_message": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.slug": (v56/*: any*/),
        "viewerArtist.artist.artworksConnection.edges.node.title": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo": (v81/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.endCursor": (v60/*: any*/),
        "viewerArtist.artist.artworksConnection.pageInfo.hasNextPage": (v82/*: any*/),
        "viewerArtist.artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "viewerArtist.artist.counts.artworks": (v78/*: any*/),
        "viewerArtist.artist.counts.forSaleArtworks": (v78/*: any*/),
        "viewerArtist.artist.href": (v60/*: any*/),
        "viewerArtist.artist.id": (v56/*: any*/),
        "viewerArtist.artist.image": (v65/*: any*/),
        "viewerArtist.artist.image.resized": (v68/*: any*/),
        "viewerArtist.artist.image.resized.src": (v54/*: any*/),
        "viewerArtist.artist.image.resized.srcSet": (v54/*: any*/),
        "viewerArtist.artist.internalID": (v56/*: any*/),
        "viewerArtist.artist.name": (v60/*: any*/),
        "viewerFeed": (v51/*: any*/),
        "viewerFeed.me": (v83/*: any*/),
        "viewerFeed.me.followsAndSaves": (v84/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection": (v85/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v86/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.cursor": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v87/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.__typename": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artists": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection": (v53/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.__isArtworkConnectionInterface": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges": (v55/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__isNode": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.__typename": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node": (v57/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist": (v52/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.targetSupply": (v58/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artist.targetSupply.isP1": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artistNames": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists": (v61/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.href": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.artists.name": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass": (v62/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.attributionClass.name": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.collecting_institution": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.cultural_maker": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.customCollections": (v63/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.customCollections.totalCount": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.date": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.href": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image": (v65/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.aspectRatio": (v66/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.internalID": (v67/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.placeholder": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.height": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.src": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.srcSet": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.resized.width": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.url": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image.versions": (v69/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.imageTitle": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.image_title": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.internalID": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.isInAuction": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_biddable": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.is_saved": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.marketPriceInsights": (v70/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.marketPriceInsights.demandRank": (v71/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType": (v72/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene": (v73/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.name": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner": (v74/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.href": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.partner.name": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.preview": (v65/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.preview.url": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale": (v75/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.display_timely_at": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.endAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v64/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_auction": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_closed": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.is_preview": (v59/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale.startAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork": (v76/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.endAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.saleArtwork.lotID": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork": (v76/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts": (v77/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": (v78/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.endAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid": (v79/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.lotID": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.lotLabel": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid": (v80/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.sale_message": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.slug": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.artworksConnection.edges.node.title": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.href": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v56/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image": (v65/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized": (v68/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.src": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.image.resized.srcSet": (v54/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.publishedAt": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.summary": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo": (v81/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.endCursor": (v60/*: any*/),
        "viewerFeed.me.followsAndSaves.bundledArtworksByArtistConnection.pageInfo.hasNextPage": (v82/*: any*/),
        "viewerFeed.me.id": (v56/*: any*/),
        "viewerMe": (v51/*: any*/),
        "viewerMe.me": (v83/*: any*/),
        "viewerMe.me.followsAndSaves": (v84/*: any*/),
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
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist": (v52/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.id": (v56/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.name": (v60/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.artist.slug": (v56/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.edges.node.id": (v56/*: any*/),
        "viewerMe.me.followsAndSaves.artistsConnection.totalCount": (v64/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection": (v85/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges": (v86/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node": (v87/*: any*/),
        "viewerMe.me.followsAndSaves.bundledArtworksByArtistConnection.edges.node.id": (v56/*: any*/),
        "viewerMe.me.id": (v56/*: any*/)
      }
    },
    "name": "WorksForYouApp_test_Query",
    "operationKind": "query",
    "text": "query WorksForYouApp_test_Query(\n  $includeSelectedArtist: Boolean!\n  $artistSlug: String!\n) {\n  viewerArtist: viewer {\n    ...WorksForYouApp_viewerArtist_1H2h5M @include(if: $includeSelectedArtist)\n  }\n  viewerFeed: viewer {\n    ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)\n  }\n  viewerMe: viewer {\n    ...WorksForYouApp_viewerMe\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  isInAuction\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n  is_saved: isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  is_saved: isSaved\n  slug\n  title\n  date\n  preview: image {\n    url(version: \"square\")\n  }\n  customCollections: collectionsConnection(first: 0, default: false, saves: true) {\n    totalCount\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment WorksForYouApp_viewerArtist_1H2h5M on Viewer {\n  ...WorksForYouArtistFeed_viewer_1H2h5M\n}\n\nfragment WorksForYouApp_viewerFeed on Viewer {\n  ...WorksForYouFeed_viewer\n}\n\nfragment WorksForYouApp_viewerMe on Viewer {\n  me {\n    followsAndSaves {\n      artistsConnection(first: 99) {\n        totalCount\n        edges {\n          node {\n            artist {\n              name\n              slug\n              id\n            }\n            id\n          }\n        }\n      }\n      bundledArtworksByArtistConnection(first: 1, forSale: true) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouArtistFeed_viewer_1H2h5M on Viewer {\n  artist(id: $artistSlug) {\n    internalID\n    name\n    href\n    counts {\n      artworks\n      forSaleArtworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        src\n        srcSet\n      }\n    }\n    artworksConnection(sort: PUBLISHED_AT_DESC, first: 25, filter: [IS_FOR_SALE]) {\n      ...ArtworkGrid_artworks\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouFeed_viewer on Viewer {\n  me {\n    followsAndSaves {\n      bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 25, forSale: true) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                src\n                srcSet\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f5e36c15c4692eb45b576053791a919";

export default node;
