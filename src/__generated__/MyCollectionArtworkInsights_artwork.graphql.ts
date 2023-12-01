/**
 * @generated SignedSource<<a9797208fef2a5547af5569aba810c6f>>
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
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
  } | null | undefined;
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

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkInsights_artwork",
  "selections": [
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

(node as any).hash = "b76e773bda7b98da07b3b6bad8ebf040";

export default node;
