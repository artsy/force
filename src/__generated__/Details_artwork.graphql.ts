/**
 * @generated SignedSource<<91ecf4711b13db49c376b1ce68d5b5ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Details_artwork$data = {
  readonly artist: {
    readonly targetSupply: {
      readonly isP1: boolean | null | undefined;
    };
  } | null | undefined;
  readonly artists: ReadonlyArray<{
    readonly href: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
  readonly collecting_institution: string | null | undefined;
  readonly collectorSignals: {
    readonly bidCount: number | null | undefined;
    readonly lotWatcherCount: number | null | undefined;
    readonly partnerOffer: {
      readonly endAt: string | null | undefined;
      readonly isActive: boolean | null | undefined;
      readonly priceWithDiscount: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly consignmentSubmission?: {
    readonly internalID: string | null | undefined;
  } | null | undefined;
  readonly cultural_maker: string | null | undefined;
  readonly date: string | null | undefined;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly marketPriceInsights: {
    readonly demandRank: number | null | undefined;
  } | null | undefined;
  readonly partner: {
    readonly href: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly sale: {
    readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
    readonly endAt: string | null | undefined;
    readonly extendedBiddingIntervalMinutes: number | null | undefined;
    readonly is_auction: boolean | null | undefined;
    readonly is_closed: boolean | null | undefined;
    readonly startAt: string | null | undefined;
  } | null | undefined;
  readonly sale_artwork: {
    readonly counts: {
      readonly bidder_positions: any | null | undefined;
    } | null | undefined;
    readonly endAt: string | null | undefined;
    readonly extendedBiddingEndAt: string | null | undefined;
    readonly formattedEndDateTime: string | null | undefined;
    readonly highest_bid: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly lotID: string | null | undefined;
    readonly lotLabel: string | null | undefined;
    readonly opening_bid: {
      readonly display: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly sale_message: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ConsignmentSubmissionStatus_artwork" | "HoverDetails_artwork" | "SaveArtworkToListsButton_artwork" | "SaveButton_artwork">;
  readonly " $fragmentType": "Details_artwork";
};
export type Details_artwork$key = {
  readonly " $data"?: Details_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"Details_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
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
  "name": "endAt",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeConsignmentSubmission"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Details_artwork",
  "selections": [
    (v0/*: any*/),
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
          "name": "bidCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotWatcherCount",
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
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isActive",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "priceWithDiscount",
              "plural": false,
              "selections": (v3/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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
      "args": (v4/*: any*/),
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
        }
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
      "args": (v4/*: any*/),
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artists",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        (v1/*: any*/),
        (v5/*: any*/)
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
      "args": (v4/*: any*/),
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        (v5/*: any*/),
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
        (v2/*: any*/),
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
        (v2/*: any*/),
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
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": "opening_bid",
          "args": null,
          "concreteType": "SaleArtworkOpeningBid",
          "kind": "LinkedField",
          "name": "openingBid",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "condition": "includeConsignmentSubmission",
      "kind": "Condition",
      "passingValue": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkConsignmentSubmission",
          "kind": "LinkedField",
          "name": "consignmentSubmission",
          "plural": false,
          "selections": [
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ConsignmentSubmissionStatus_artwork"
        }
      ]
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveArtworkToListsButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HoverDetails_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "d380632c4716d8141767573753b5a5d4";

export default node;
