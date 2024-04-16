/**
 * @generated SignedSource<<8ea5d5af347e0eb1eb7353735e60617d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkInsights_artwork$data = {
  readonly artist: {
    readonly auctionResultsCount: {
      readonly totalCount: number | null | undefined;
    } | null | undefined;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
  } | null | undefined;
  readonly auctionResults: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly hasPriceEstimateRequest: boolean | null | undefined;
  readonly internalID: string;
  readonly isPriceEstimateRequestable: boolean | null | undefined;
  readonly marketPriceInsights: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkArtistMarket_marketPriceInsights" | "MyCollectionArtworkDemandIndex_marketPriceInsights">;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkComparables_artwork" | "MyCollectionArtworkRequestPriceEstimateSection_artwork">;
  readonly " $fragmentType": "MyCollectionArtworkInsights_artwork";
};
export type MyCollectionArtworkInsights_artwork$key = {
  readonly " $data"?: MyCollectionArtworkInsights_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkInsights_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkInsights_artwork",
  "selections": [
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
      "name": "isPriceEstimateRequestable",
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
      "alias": "auctionResults",
      "args": (v0/*: any*/),
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "comparableAuctionResults",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "comparableAuctionResults(first:1)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkComparables_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkRequestPriceEstimateSection_artwork"
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
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "alias": "auctionResultsCount",
          "args": (v0/*: any*/),
          "concreteType": "AuctionResultConnection",
          "kind": "LinkedField",
          "name": "auctionResultsConnection",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "auctionResultsConnection(first:1)"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyCollectionArtworkAuctionResults_artist"
        }
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyCollectionArtworkArtistMarket_marketPriceInsights"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MyCollectionArtworkDemandIndex_marketPriceInsights"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "8705d297de9f71b7219523fffee77a1d";

export default node;
