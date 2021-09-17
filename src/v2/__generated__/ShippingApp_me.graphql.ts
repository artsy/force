/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingApp_me = {
    readonly name: string | null;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me">;
    readonly " $refType": "ShippingApp_me";
};
export type ShippingApp_me$data = ShippingApp_me;
export type ShippingApp_me$key = {
    readonly " $data"?: ShippingApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ShippingApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShippingApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsAddresses_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '45443c61c0eec90f7961c5cebb65dc8c';
export default node;
