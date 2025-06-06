/**
 * @generated SignedSource<<c5240c78ff15b4ae7a5aeb6ac4dbdf1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2HelpLinks_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "Order2HelpLinks_order";
};
export type Order2HelpLinks_order$key = {
  readonly " $data"?: Order2HelpLinks_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Order2HelpLinks_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order2HelpLinks_order",
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

(node as any).hash = "9dc653777533befbfbd2eb4b95853f26";

export default node;
