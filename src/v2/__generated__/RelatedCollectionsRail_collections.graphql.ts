/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RelatedCollectionsRail_collections = ReadonlyArray<{
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"RelatedCollectionEntity_collection">;
    readonly " $refType": "RelatedCollectionsRail_collections";
}>;
export type RelatedCollectionsRail_collections$data = RelatedCollectionsRail_collections;
export type RelatedCollectionsRail_collections$key = ReadonlyArray<{
    readonly " $data"?: RelatedCollectionsRail_collections$data;
    readonly " $fragmentRefs": FragmentRefs<"RelatedCollectionsRail_collections">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RelatedCollectionEntity_collection"
    }
  ],
  "type": "MarketingCollection"
};
(node as any).hash = '2f43f18639dae0ffdebf31c8badbc58e';
export default node;
