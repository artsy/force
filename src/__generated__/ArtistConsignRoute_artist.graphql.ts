/**
 * @generated SignedSource<<eabebbb34aba0ab6a185ff633d0cad10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRoute_artist$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignFAQ_artist" | "ArtistConsignHeader_artist" | "ArtistConsignHowToSell_artist" | "ArtistConsignMarketTrends_artist" | "ArtistConsignMeta_artist" | "ArtistConsignPageViews_artist" | "ArtistConsignRecentlySold_artist" | "ArtistConsignSellArt_artist">;
  readonly " $fragmentType": "ArtistConsignRoute_artist";
};
export type ArtistConsignRoute_artist$key = {
  readonly " $data"?: ArtistConsignRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistConsignRoute_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignRoute_artist",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignMeta_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignHeader_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignRecentlySold_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignPageViews_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignMarketTrends_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignHowToSell_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignFAQ_artist"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistConsignSellArt_artist"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "e0df512f5a669dee1be76335fb97ecaf";

export default node;
