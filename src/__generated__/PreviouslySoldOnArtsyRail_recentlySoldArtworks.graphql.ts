/**
 * @generated SignedSource<<b20b7c69585b283714d52e091c184147>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviouslySoldOnArtsyRail_recentlySoldArtworks$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly artwork: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"SoldArtwork_artwork">;
      } | null | undefined;
      readonly highEstimate: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly lowEstimate: {
        readonly display: string | null | undefined;
      } | null | undefined;
      readonly performance: {
        readonly mid: string | null | undefined;
      } | null | undefined;
      readonly priceRealized: {
        readonly display: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PreviouslySoldOnArtsyRail_recentlySoldArtworks";
};
export type PreviouslySoldOnArtsyRail_recentlySoldArtworks$key = {
  readonly " $data"?: PreviouslySoldOnArtsyRail_recentlySoldArtworks$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviouslySoldOnArtsyRail_recentlySoldArtworks">;
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
  "name": "PreviouslySoldOnArtsyRail_recentlySoldArtworks",
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
                  "name": "SoldArtwork_artwork"
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
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "RecenltySoldArtworkPerformance",
              "kind": "LinkedField",
              "name": "performance",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mid",
                  "storageKey": null
                }
              ],
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

(node as any).hash = "000c317d1d14b80122cc35e1f496e33a";

export default node;
