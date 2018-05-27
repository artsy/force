/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type TotalCount_filter_artworks = {
    readonly counts: ({
        readonly total: any | null;
    }) | null;
};



const node: ConcreteFragment = {
  "kind": "Fragment",
  "name": "TotalCount_filter_artworks",
  "type": "FilterArtworks",
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
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "__id",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'ef252545faa2dcdc0445805a52f4e7c0';
export default node;
