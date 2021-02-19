/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PaymentApp_me = {
    readonly name: string | null;
    readonly addressCount: {
        readonly totalCount: number;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me" | "UserSettingsPayments_me">;
    readonly " $refType": "PaymentApp_me";
};
export type PaymentApp_me$data = PaymentApp_me;
export type PaymentApp_me$key = {
    readonly " $data"?: PaymentApp_me$data;
    readonly " $fragmentRefs": FragmentRefs<"PaymentApp_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PaymentApp_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": "addressCount",
      "args": null,
      "concreteType": "UserAddressConnection",
      "kind": "LinkedField",
      "name": "addressConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsAddresses_me"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSettingsPayments_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = '1e43809ee46581aefef914e74d5f6173';
export default node;
