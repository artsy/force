/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_recentlySoldArtworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly artwork: {
                readonly slug: string;
                readonly href: string | null;
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
            readonly lowEstimate: {
                readonly display: string | null;
            } | null;
            readonly highEstimate: {
                readonly display: string | null;
            } | null;
            readonly priceRealized: {
                readonly display: string | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "SoldRecentlyOnArtsy_recentlySoldArtworks";
};
export type SoldRecentlyOnArtsy_recentlySoldArtworks$data = SoldRecentlyOnArtsy_recentlySoldArtworks;
export type SoldRecentlyOnArtsy_recentlySoldArtworks$key = {
    readonly " $data"?: SoldRecentlyOnArtsy_recentlySoldArtworks$data;
    readonly " $fragmentRefs": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SoldRecentlyOnArtsy_recentlySoldArtworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RecentlySoldArtworkTypeEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RecentlySoldArtworkType",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "artwork",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 325
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "lowEstimate",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "highEstimate",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Money",
              "kind": "LinkedField",
              "name": "priceRealized",
              "plural": false,
              "selections": (v0/*: any*/),
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RecentlySoldArtworkTypeConnection",
  "abstractKey": null
};
})();
(node as any).hash = '3383851e54e381c51407feb8f1525d5c';
export default node;
