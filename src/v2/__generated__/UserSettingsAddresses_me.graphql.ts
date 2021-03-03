/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsAddresses_me = {
    readonly id: string;
    readonly internalID: string;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavedAddresses_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'db2ab86442c248fa1ed5e1a5ed53c165';
export default node;
