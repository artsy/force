/**
 * @generated SignedSource<<5a25923542165e319cd303321b54ec18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OnboardingMarketingCollection_marketingCollection$data = {
  readonly artworks: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly title: string;
  readonly " $fragmentType": "OnboardingMarketingCollection_marketingCollection";
};
export type OnboardingMarketingCollection_marketingCollection$key = {
  readonly " $data"?: OnboardingMarketingCollection_marketingCollection$data;
  readonly " $fragmentSpreads": FragmentRefs<"OnboardingMarketingCollection_marketingCollection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OnboardingMarketingCollection_marketingCollection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "page",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "-decayed_merch"
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GridItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:50,page:1,sort:\"-decayed_merch\")"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "e8392b6fc42af68d5aeb3d3b693865d5";

export default node;
