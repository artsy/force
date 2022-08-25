/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork = {
    readonly internalID: string;
    readonly artist: {
        readonly slug: string;
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
    } | null;
    readonly marketPriceInsights: {
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkArtistMarket_marketPriceInsights" | "MyCollectionArtworkDemandIndex_marketPriceInsights">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebar_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkImageBrowser_artwork" | "MyCollectionArtworkComparables_artwork">;
    readonly " $refType": "MyCollectionArtwork_artwork";
};
export type MyCollectionArtwork_artwork$data = MyCollectionArtwork_artwork;
export type MyCollectionArtwork_artwork$key = {
    readonly " $data"?: MyCollectionArtwork_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtwork_artwork",
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
    },
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
      "name": "MyCollectionArtworkImageBrowser_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkComparables_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '5af634a3c5421da6b4995e22d9a17d25';
export default node;
