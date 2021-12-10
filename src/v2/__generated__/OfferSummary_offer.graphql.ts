/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OfferSummary_offer = {
    readonly saleDate: string | null;
    readonly saleLocation: string | null;
    readonly saleName: string | null;
    readonly " $refType": "OfferSummary_offer";
};
export type OfferSummary_offer$data = OfferSummary_offer;
export type OfferSummary_offer$key = {
    readonly " $data"?: OfferSummary_offer$data;
    readonly " $fragmentRefs": FragmentRefs<"OfferSummary_offer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OfferSummary_offer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleLocation",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleName",
      "storageKey": null
    }
  ],
  "type": "ConsignmentOffer",
  "abstractKey": null
};
(node as any).hash = '0172c6e132f964672fe23acc4f22fa2d';
export default node;
