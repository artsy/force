/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackupSecondFactorModalContent_me = {
    readonly backupSecondFactors: ReadonlyArray<{
        readonly code?: string;
    } | null> | null;
    readonly " $refType": "BackupSecondFactorModalContent_me";
};
export type BackupSecondFactorModalContent_me$data = BackupSecondFactorModalContent_me;
export type BackupSecondFactorModalContent_me$key = {
    readonly " $data"?: BackupSecondFactorModalContent_me$data;
    readonly " $fragmentRefs": FragmentRefs<"BackupSecondFactorModalContent_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BackupSecondFactorModalContent_me",
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
              "name": "code",
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
(node as any).hash = '59bb25aba7d7357efac7d1fdaa4a177e';
export default node;
