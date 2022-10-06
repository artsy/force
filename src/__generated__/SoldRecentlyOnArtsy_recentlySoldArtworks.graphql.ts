/**
 * @generated SignedSource<<9b2db065de6b67c9e01f65a53f3dbab6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SoldRecentlyOnArtsy_recentlySoldArtworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly artwork: {
        readonly href: string | null;
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null;
      readonly highEstimate: {
        readonly display: string | null;
      } | null;
      readonly lowEstimate: {
        readonly display: string | null;
      } | null;
      readonly priceRealized: {
        readonly display: string | null;
      } | null;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "SoldRecentlyOnArtsy_recentlySoldArtworks";
};
export type SoldRecentlyOnArtsy_recentlySoldArtworks$key = {
  readonly " $data"?: SoldRecentlyOnArtsy_recentlySoldArtworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"SoldRecentlyOnArtsy_recentlySoldArtworks">;
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                },
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

(node as any).hash = "f60bd979112cbf02e6fb9bd4d4a32eb8";

export default node;
