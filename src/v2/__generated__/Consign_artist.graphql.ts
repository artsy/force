/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Consign_artist = {
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignMeta_artist" | "ArtistConsignHeader_artist" | "ArtistConsignRecentlySold_artist" | "ArtistConsignPageViews_artist" | "ArtistConsignMarketTrends_artist" | "ArtistConsignHowToSell_artist" | "ArtistConsignFAQ_artist" | "ArtistConsignSellArt_artist">;
    readonly " $refType": "Consign_artist";
};
export type Consign_artist$data = Consign_artist;
export type Consign_artist$key = {
    readonly " $data"?: Consign_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Consign_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Consign_artist",
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
  "type": "Artist"
};
(node as any).hash = '9f723d20ef4f7c755733a715e40e129d';
export default node;
