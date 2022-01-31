/**
 * @generated SignedSource<<78975eae047cc34fa407997f741ec9fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BackupSecondFactor_me$data = {
  readonly backupSecondFactors: ReadonlyArray<{
    readonly __typename: "BackupSecondFactor";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null> | null;
  readonly " $fragmentType": "BackupSecondFactor_me";
};
export type BackupSecondFactor_me$key = {
  readonly " $data"?: BackupSecondFactor_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"BackupSecondFactor_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackupSecondFactor_me",
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

(node as any).hash = "b14b3aa1d58e9c12323972a66aa181db";

export default node;
