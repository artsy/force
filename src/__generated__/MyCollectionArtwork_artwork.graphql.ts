/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork = {
    readonly internalID: string;
    readonly comparables: {
        readonly totalCount: number | null;
    } | null;
    readonly artist: {
        readonly slug: string;
        readonly auctionResults: {
            readonly totalCount: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
    } | null;
    readonly priceInsights: {
        readonly artistId: string | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowser_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkInsights_artwork" | "MyCollectionArtworkSidebar_artwork" | "MyCollectionArtworkSidebarTitleInfo_artwork">;
    readonly " $refType": "MyCollectionArtwork_artwork";
};
export type MyCollectionArtwork_artwork$data = MyCollectionArtwork_artwork;
export type MyCollectionArtwork_artwork$key = {
    readonly " $data"?: MyCollectionArtwork_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtwork_artwork">;
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
];
return {
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
    },
    {
      "alias": "priceInsights",
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
          "name": "artistId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
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
      "name": "MyCollectionArtworkSidebar_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MyCollectionArtworkSidebarTitleInfo_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'ddd30315ca01e89d04a04ea757ba93cc';
export default node;
