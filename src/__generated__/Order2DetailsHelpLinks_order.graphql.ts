/**
 * @generated SignedSource<<d6b06f37daf5767d2ddf7ea367905f16>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsHelpLinks_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Order2DetailsHelpLinks_order";
};
export type Order2DetailsHelpLinks_order$key = {
  readonly " $data"?: Order2DetailsHelpLinks_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsHelpLinks_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsHelpLinks_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "Order",
  "abstractKey": null
};

(node as any).hash = "0894cc510c052c1b04d2239b1cd09f98";

export default node;
