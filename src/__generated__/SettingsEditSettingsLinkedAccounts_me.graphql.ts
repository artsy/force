/**
 * @generated SignedSource<<fdefbc915d408dcff4dd0a4211377af4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type AuthenticationProvider = "APPLE" | "FACEBOOK" | "GOOGLE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsLinkedAccounts_me$data = {
  readonly authentications: ReadonlyArray<{
    readonly provider: AuthenticationProvider;
  }>;
  readonly hasSecondFactorEnabled: boolean;
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
      "kind": "ScalarField",
      "name": "hasSecondFactorEnabled",
      "storageKey": null
    },
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

(node as any).hash = "c3d3db28bb68992831f613763c072521";

export default node;
