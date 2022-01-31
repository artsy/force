/**
 * @generated SignedSource<<816117a38ae648b88e4ad75e98d0bbfb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OfferSummary_offer$data = {
  readonly saleDate: string | null;
  readonly saleLocation: string | null;
  readonly saleName: string | null;
  readonly " $fragmentType": "OfferSummary_offer";
};
export type OfferSummary_offer$key = {
  readonly " $data"?: OfferSummary_offer$data;
  readonly " $fragmentSpreads": FragmentRefs<"OfferSummary_offer">;
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

(node as any).hash = "0172c6e132f964672fe23acc4f22fa2d";

export default node;
