/**
 * @generated SignedSource<<f7cc0c384190587f14d454fb8b96c265>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork$data = {
  readonly artist: {
    readonly auctionResults: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly slug: string;
    readonly targetSupply: {
      readonly isP1: boolean | null | undefined;
    };
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
  } | null | undefined;
  readonly comparables: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly consignmentSubmission: {
    readonly displayText: string | null | undefined;
  } | null | undefined;
  readonly hasMarketPriceInsights: boolean | null | undefined;
  readonly internalID: string;
  readonly slug: string;
  readonly submissionId: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkComparables_artwork" | "MyCollectionArtworkImageBrowser_artwork" | "MyCollectionArtworkInsights_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkRequestPriceEstimateSection_artwork" | "MyCollectionArtworkSidebarTitleInfo_artwork" | "MyCollectionArtworkSidebar_artwork">;
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
      "name": "MyCollectionArtworkSidebar_artwork"
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
      "name": "MyCollectionArtworkSidebarTitleInfo_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkRequestPriceEstimateSection_artwork"
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    (v1/*: any*/),
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
          "name": "displayText",
          "storageKey": null
        }
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
        (v1/*: any*/),
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

(node as any).hash = "73403796b1dc17d77055621b071a2222";

export default node;
