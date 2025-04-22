/**
 * @generated SignedSource<<1da1e5906104c7c0741db3d73aaa464a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2DetailsRoute_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Order2DetailsRoute_order";
};
export type Order2DetailsRoute_order$key = {
  readonly " $data"?: Order2DetailsRoute_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2DetailsRoute_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2DetailsRoute_order",
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

(node as any).hash = "75912595ea737bb4da0fff3039422e4a";

export default node;
