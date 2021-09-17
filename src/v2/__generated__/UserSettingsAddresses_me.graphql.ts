/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsAddresses_me = {
    readonly id: string;
    readonly internalID: string;
    readonly addresses: {
        readonly totalCount: number;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"SavedAddresses_me">;
    readonly " $refType": "UserSettingsAddresses_me";
};
export type UserSettingsAddresses_me$data = UserSettingsAddresses_me;
export type UserSettingsAddresses_me$key = {
    readonly " $data"?: UserSettingsAddresses_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsAddresses_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserSettingsAddresses_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": "addresses",
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
      "name": "SavedAddresses_me"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '3262b4264d49e736c6c489e1f6cc36b5';
export default node;
