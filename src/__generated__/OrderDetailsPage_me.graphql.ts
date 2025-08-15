/**
 * @generated SignedSource<<4b6404a94fc0b06947e96a4e7f62f24c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsPage_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsMessage_me">;
  readonly " $fragmentType": "OrderDetailsPage_me";
};
export type OrderDetailsPage_me$key = {
  readonly " $data"?: OrderDetailsPage_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPage_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderDetailsPage_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderDetailsMessage_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "0d561f13a343e561ceb626fea8e0afc7";

export default node;
