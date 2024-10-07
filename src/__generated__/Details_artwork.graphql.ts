/**
 * @generated SignedSource<<b5884de837507f8b9f2355b1ee239059>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type LabelSignalEnum = "CURATORS_PICK" | "INCREASED_INTEREST" | "PARTNER_OFFER" | "%future added value";
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
  readonly collectingInstitution: string | null | undefined;
  readonly collectorSignals: {
    readonly auction: {
      readonly bidCount: number;
      readonly liveBiddingStarted: boolean;
      readonly lotClosesAt: string | null | undefined;
      readonly onlineBiddingExtended: boolean;
      readonly registrationEndsAt: string | null | undefined;
    } | null | undefined;
    readonly partnerOffer: {
      readonly endAt: string | null | undefined;
      readonly priceWithDiscount: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly primaryLabel: LabelSignalEnum | null | undefined;
  } | null | undefined;
  readonly consignmentSubmission?: {
    readonly internalID: string | null | undefined;
  } | null | undefined;
  readonly culturalMaker: string | null | undefined;
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
    readonly isAuction: boolean | null | undefined;
    readonly isClosed: boolean | null | undefined;
    readonly startAt: string | null | undefined;
  } | null | undefined;
  readonly saleArtwork: {
    readonly counts: {
      readonly bidderPositions: any | null | undefined;
    } | null | undefined;
    readonly endAt: string | null | undefined;
    readonly extendedBiddingEndAt: string | null | undefined;
    readonly formattedEndDateTime: string | null | undefined;
    readonly highestBid: {
      readonly display: string | null | undefined;
    } | null | undefined;
    readonly lotID: string | null | undefined;
    readonly lotLabel: string | null | undefined;
    readonly openingBid: {
      readonly display: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly saleMessage: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"BidTimerLine_artwork" | "ConsignmentSubmissionStatus_artwork" | "HoverDetails_artwork">;
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
            (v2/*: any*/),
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleMessage",
      "storageKey": null
    },
    {
      "alias": null,
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
      "alias": null,
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
        }
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
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
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
      "name": "BidTimerLine_artwork"
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

(node as any).hash = "5874eab010626e0be2516cb7236b8d13";

export default node;
