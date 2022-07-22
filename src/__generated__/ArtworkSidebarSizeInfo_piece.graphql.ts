/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    readonly " $data"?: ArtworkSidebarSizeInfo_piece$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebarSizeInfo_piece">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebarSizeInfo_piece",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "dimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "in",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "cm",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "edition_of",
      "args": null,
      "kind": "ScalarField",
      "name": "editionOf",
      "storageKey": null
    }
  ],
  "type": "Sellable",
  "abstractKey": "__isSellable"
};
(node as any).hash = '084d24d3f414c5839dbc469b7d8c1810';
export default node;
