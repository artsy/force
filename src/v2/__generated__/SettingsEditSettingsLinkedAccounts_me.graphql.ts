/**
 * @generated SignedSource<<501055ef80f2e121cffb889806272081>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AuthenticationProvider = "APPLE" | "FACEBOOK" | "GOOGLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsLinkedAccounts_me$data = {
  readonly authentications: ReadonlyArray<{
    readonly provider: AuthenticationProvider;
  }>;
  readonly " $fragmentType": "SettingsEditSettingsLinkedAccounts_me";
};
export type SettingsEditSettingsLinkedAccounts_me$key = {
  readonly " $data"?: SettingsEditSettingsLinkedAccounts_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsLinkedAccounts_me">;
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

(node as any).hash = "a55e6069851be3fddb81897ba96a6c80";

export default node;
