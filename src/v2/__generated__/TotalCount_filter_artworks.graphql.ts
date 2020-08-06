/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TotalCount_filter_artworks = {
    readonly counts: {
        readonly total: number | null;
    } | null;
    readonly " $refType": "TotalCount_filter_artworks";
};
export type TotalCount_filter_artworks$data = TotalCount_filter_artworks;
export type TotalCount_filter_artworks$key = {
    readonly " $data"?: TotalCount_filter_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"TotalCount_filter_artworks">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "TotalCount_filter_artworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksCounts",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "total",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'd0c25a1f9c03191997d2f5681496185e';
export default node;
