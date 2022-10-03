/**
 * @generated SignedSource<<39b594907c879a406982dd294b9fad4c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewPayment_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_me">;
  readonly " $fragmentType": "NewPayment_me";
};
export type NewPayment_me$key = {
  readonly " $data"?: NewPayment_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewPayment_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPayment_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreditCardPicker_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "aa880df7bf9ad52ce276076df1c03ecd";

export default node;
