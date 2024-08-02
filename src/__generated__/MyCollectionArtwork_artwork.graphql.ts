/**
 * @generated SignedSource<<f6c94bac866da6d5a5ffb337317f02cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ArtistTargetSupplyPriority = "FALSE" | "TRUE" | "%future added value";
export type ArtworkConsignmentSubmissionState = "APPROVED" | "CLOSED" | "DRAFT" | "HOLD" | "PUBLISHED" | "REJECTED" | "RESUBMITTED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork$data = {
  readonly artist: {
    readonly auctionResults: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly slug: string;
    readonly targetSupply: {
      readonly priority: ArtistTargetSupplyPriority | null | undefined;
    };
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
  } | null | undefined;
  readonly comparables: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly consignmentSubmission: {
    readonly internalID: string | null | undefined;
    readonly state: ArtworkConsignmentSubmissionState;
  } | null | undefined;
  readonly hasMarketPriceInsights: boolean | null | undefined;
  readonly hasPriceEstimateRequest: boolean | null | undefined;
  readonly internalID: string;
  readonly slug: string;
  readonly submissionId: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAboutTab_artwork" | "MyCollectionArtworkComparables_artwork" | "MyCollectionArtworkDetails_artwork" | "MyCollectionArtworkHeader_artwork" | "MyCollectionArtworkImageBrowser_artwork" | "MyCollectionArtworkInsights_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkRequestPriceEstimate_artwork" | "MyCollectionArtworkSWASectionSubmitted_submissionState" | "MyCollectionArtworkSWASubmissionStatus_artwork" | "MyCollectionArtworkSubmitForSale_artwork" | "MyCollectionArtworkTitle_artwork">;
  readonly " $fragmentType": "MyCollectionArtwork_artwork";
};
export type MyCollectionArtwork_artwork$key = {
  readonly " $data"?: MyCollectionArtwork_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtwork_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtwork_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkHeader_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkTitle_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkDetails_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkMeta_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkInsights_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkImageBrowser_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkComparables_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkRequestPriceEstimate_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSWASectionSubmitted_submissionState"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSWASubmissionStatus_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSubmitForSale_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkAboutTab_artwork"
    },
    {
      "alias": "comparables",
      "args": null,
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "comparableAuctionResults",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasPriceEstimateRequest",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasMarketPriceInsights",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "submissionId",
      "storageKey": null
    },
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConsignmentSubmission",
      "kind": "LinkedField",
      "name": "consignmentSubmission",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        },
        (v1/*: any*/)
      ],
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
        (v2/*: any*/),
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
              "name": "priority",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": "auctionResults",
          "args": null,
          "concreteType": "AuctionResultConnection",
          "kind": "LinkedField",
          "name": "auctionResultsConnection",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyCollectionArtworkAuctionResults_artist"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "184d7bd2a5e89f1a008616dcbcd90a38";

export default node;
