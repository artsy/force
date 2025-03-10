/**
 * @generated SignedSource<<20f9337ab702490d40a6b0a26a739938>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditSettingsTwoFactorBackupCodes_me$data = {
  readonly backupSecondFactors: ReadonlyArray<{
    readonly __typename: "BackupSecondFactor";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "SettingsEditSettingsTwoFactorBackupCodes_me";
};
export type SettingsEditSettingsTwoFactorBackupCodes_me$key = {
  readonly " $data"?: SettingsEditSettingsTwoFactorBackupCodes_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditSettingsTwoFactorBackupCodes_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditSettingsTwoFactorBackupCodes_me",
  "selections": [
    {
      "alias": "backupSecondFactors",
      "args": [
        {
          "kind": "Literal",
          "name": "kinds",
          "value": [
            "backup"
          ]
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "secondFactors",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "type": "BackupSecondFactor",
          "abstractKey": null
        }
      ],
      "storageKey": "secondFactors(kinds:[\"backup\"])"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "c102dd2ab6c438622429024b2e26e437";

export default node;
