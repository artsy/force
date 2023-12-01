/**
 * @generated SignedSource<<dee6ca86ef984000d165d7b6e5235b06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RelatedCollectionsRail_collections$data = ReadonlyArray<{
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"RelatedCollectionEntity_collection">;
  readonly " $fragmentType": "RelatedCollectionsRail_collections";
}>;
export type RelatedCollectionsRail_collections$key = ReadonlyArray<{
  readonly " $data"?: RelatedCollectionsRail_collections$data;
  readonly " $fragmentSpreads": FragmentRefs<"RelatedCollectionsRail_collections">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "RelatedCollectionsRail_collections",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RelatedCollectionEntity_collection"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "TOTAL"
          ]
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
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
                  "name": "id",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")"
    }
  ],
  "type": "MarketingCollection",
  "abstractKey": null
};

(node as any).hash = "2f43f18639dae0ffdebf31c8badbc58e";

export default node;
