/**
 * @generated SignedSource<<fb8909112daef2bbfa721873031f03c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaveAndContinueButton_order$data = {
  readonly internalID: string;
  readonly " $fragmentType": "SaveAndContinueButton_order";
};
export type SaveAndContinueButton_order$key = {
  readonly " $data"?: SaveAndContinueButton_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaveAndContinueButton_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaveAndContinueButton_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "3d26cdf4ed629ef2d7f54cf3014bf38b";

export default node;
