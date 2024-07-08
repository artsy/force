/**
 * @generated SignedSource<<1c755b1ed365ca22ea71dfa7101fb78a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeWorksByArtistsYouFollowRailQuery$variables = Record<PropertyKey, never>;
export type HomeWorksByArtistsYouFollowRailQuery$data = {
  readonly homePage: {
    readonly " $fragmentSpreads": FragmentRefs<"HomeWorksByArtistsYouFollowRail_homePage">;
  } | null | undefined;
};
export type HomeWorksByArtistsYouFollowRailQuery = {
  response: HomeWorksByArtistsYouFollowRailQuery$data;
  variables: HomeWorksByArtistsYouFollowRailQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeWorksByArtistsYouFollowRailQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "HomeWorksByArtistsYouFollowRail_homePage"
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
    "name": "HomeWorksByArtistsYouFollowRailQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HomePage",
        "kind": "LinkedField",
        "name": "homePage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "key",
                "value": "FOLLOWED_ARTISTS"
              }
            ],
            "concreteType": "HomePageArtworkModule",
            "kind": "LinkedField",
            "name": "artworkModule",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Artwork",
                "kind": "LinkedField",
                "name": "results",
                "plural": true,
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isUnlisted",
                    "storageKey": null
                  },
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
                    "storageKey": "artist(shallow:true)"
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
                    "name": "isSaved",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isSavedToList",
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "blurhashDataURL",
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
            "storageKey": "artworkModule(key:\"FOLLOWED_ARTISTS\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a20844c563eb18d1bc9232f629bed7d0",
    "id": null,
    "metadata": {},
    "name": "HomeWorksByArtistsYouFollowRailQuery",
    "operationKind": "query",
    "text": "query HomeWorksByArtistsYouFollowRailQuery {\n  homePage {\n    ...HomeWorksByArtistsYouFollowRail_homePage\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {\n  artworkModule(key: FOLLOWED_ARTISTS) {\n    results {\n      internalID\n      slug\n      ...ShelfArtwork_artwork\n      id\n    }\n    id\n  }\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n    blurhashDataURL\n  }\n}\n"
  }
};
})();

(node as any).hash = "d2a7d064aedc6d20467268f5dbedd13f";

export default node;
