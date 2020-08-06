/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthentication_me = {
    readonly hasSecondFactorEnabled: boolean;
    readonly " $fragmentRefs": FragmentRefs<"AppSecondFactor_me" | "SmsSecondFactor_me" | "BackupSecondFactor_me">;
    readonly " $refType": "TwoFactorAuthentication_me";
};
export type TwoFactorAuthentication_me$data = TwoFactorAuthentication_me;
export type TwoFactorAuthentication_me$key = {
    readonly " $data"?: TwoFactorAuthentication_me$data;
    readonly " $fragmentRefs": FragmentRefs<"TwoFactorAuthentication_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "TwoFactorAuthentication_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "hasSecondFactorEnabled",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "AppSecondFactor_me",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "SmsSecondFactor_me",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "BackupSecondFactor_me",
      "args": null
    }
  ]
};
(node as any).hash = 'eac31dfdac45d8d82d5c52be1fac4bf8';
export default node;
