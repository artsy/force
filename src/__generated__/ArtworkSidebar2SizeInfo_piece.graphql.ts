/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2SizeInfo_piece = {
    readonly dimensions: {
        readonly in: string | null;
        readonly cm: string | null;
    } | null;
    readonly editionOf: string | null;
    readonly " $refType": "ArtworkSidebar2SizeInfo_piece";
};
export type ArtworkSidebar2SizeInfo_piece$data = ArtworkSidebar2SizeInfo_piece;
export type ArtworkSidebar2SizeInfo_piece$key = {
    readonly " $data"?: ArtworkSidebar2SizeInfo_piece$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2SizeInfo_piece">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkSidebar2SizeInfo_piece",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "editionOf",
      "storageKey": null
    }
  ],
  "type": "Sellable",
  "abstractKey": "__isSellable"
};
(node as any).hash = 'd279249e1cd0b50923969a85224b0200';
export default node;
