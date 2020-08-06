/* tslint:disable */

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
  "kind": "Fragment",
  "name": "BackupSecondFactorModalContent_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": "backupSecondFactors",
      "name": "secondFactors",
      "storageKey": "secondFactors(kinds:[\"backup\"])",
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
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "type": "BackupSecondFactor",
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "code",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '59bb25aba7d7357efac7d1fdaa4a177e';
export default node;
