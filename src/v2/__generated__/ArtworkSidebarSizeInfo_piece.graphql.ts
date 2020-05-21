/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebarSizeInfo_piece = {
    readonly dimensions: {
        readonly in: string | null;
        readonly cm: string | null;
    } | null;
    readonly edition_of: string | null;
    readonly " $refType": "ArtworkSidebarSizeInfo_piece";
};
export type ArtworkSidebarSizeInfo_piece$data = ArtworkSidebarSizeInfo_piece;
export type ArtworkSidebarSizeInfo_piece$key = {
    readonly " $data"?: ArtworkSidebarSizeInfo_piece$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkSidebarSizeInfo_piece",
  "type": "Sellable",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "dimensions",
      "storageKey": null,
      "args": null,
      "concreteType": "dimensions",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "in",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "cm",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": "edition_of",
      "name": "editionOf",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '084d24d3f414c5839dbc469b7d8c1810';
export default node;
