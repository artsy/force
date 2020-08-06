/* tslint:disable */
/* eslint-disable */

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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotalCount_filter_artworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection"
};
(node as any).hash = 'd0c25a1f9c03191997d2f5681496185e';
export default node;
