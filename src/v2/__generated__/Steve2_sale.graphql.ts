/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Steve2_sale = {
    readonly is_closed: boolean | null;
    readonly " $refType": "Steve2_sale";
};
export type Steve2_sale$data = Steve2_sale;
export type Steve2_sale$key = {
    readonly " $data"?: Steve2_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Steve2_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Steve2_sale",
  "selections": [
    {
      "alias": "is_closed",
      "args": null,
      "kind": "ScalarField",
      "name": "isClosed",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = '2b65e95964a2cc67dc000d4a7db88df1';
export default node;
