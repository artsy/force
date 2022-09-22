/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtwork_artwork = {
    readonly comparables: {
        readonly totalCount: number | null;
    } | null;
    readonly hasMarketPriceInsights: boolean | null;
    readonly internalID: string;
    readonly slug: string;
    readonly artist: {
        readonly slug: string;
        readonly auctionResults: {
            readonly totalCount: number | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkAuctionResults_artist">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkSidebar_artwork" | "MyCollectionArtworkMeta_artwork" | "MyCollectionArtworkInsights_artwork" | "MyCollectionArtworkImageBrowser_artwork" | "MyCollectionArtworkComparables_artwork" | "MyCollectionArtworkSidebarTitleInfo_artwork">;
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
      "name": "internalID",
      "storageKey": null
    },
    (v1/*: any*/),
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = 'fab8df5f1af3b0044a009aee5788c1ec';
export default node;
