/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type LotTimer_saleArtwork = {
    readonly endAt: string | null;
    readonly " $refType": "LotTimer_saleArtwork";
};
export type LotTimer_saleArtwork$data = LotTimer_saleArtwork;
export type LotTimer_saleArtwork$key = {
    readonly " $data"?: LotTimer_saleArtwork$data;
    readonly " $fragmentRefs": FragmentRefs<"LotTimer_saleArtwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LotTimer_saleArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endAt",
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};
(node as any).hash = '89a20e55bf8be146b26a1eb78a98646f';
export default node;
