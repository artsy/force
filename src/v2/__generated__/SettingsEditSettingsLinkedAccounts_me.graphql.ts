/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuthenticationProvider = "APPLE" | "FACEBOOK" | "GOOGLE" | "%future added value";
export type SettingsEditSettingsLinkedAccounts_me = {
    readonly authentications: ReadonlyArray<{
        readonly provider: AuthenticationProvider;
    }>;
    readonly " $refType": "SettingsEditSettingsLinkedAccounts_me";
};
export type SettingsEditSettingsLinkedAccounts_me$data = SettingsEditSettingsLinkedAccounts_me;
export type SettingsEditSettingsLinkedAccounts_me$key = {
    readonly " $data"?: SettingsEditSettingsLinkedAccounts_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditSettingsLinkedAccounts_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsLinkedAccounts_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationType",
      "kind": "LinkedField",
      "name": "authentications",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "provider",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = 'a55e6069851be3fddb81897ba96a6c80';
export default node;
