/* tslint:disable */

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
  "kind": "Fragment",
  "name": "RelatedCollectionsRail_collections",
  "type": "MarketingCollection",
  "metadata": {
    "plural": true
  },
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
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
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "id",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "RelatedCollectionEntity_collection",
      "args": null
    }
  ]
};
(node as any).hash = '2f43f18639dae0ffdebf31c8badbc58e';
export default node;
