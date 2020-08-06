/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BackupSecondFactor_me = {
    readonly backupSecondFactors: ReadonlyArray<({
        readonly __typename: "BackupSecondFactor";
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly __typename: "%other";
    }) | null> | null;
    readonly " $refType": "BackupSecondFactor_me";
};
export type BackupSecondFactor_me$data = BackupSecondFactor_me;
export type BackupSecondFactor_me$key = {
    readonly " $data"?: BackupSecondFactor_me$data;
    readonly " $fragmentRefs": FragmentRefs<"BackupSecondFactor_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "BackupSecondFactor_me",
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
              "name": "__typename",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'b14b3aa1d58e9c12323972a66aa181db';
export default node;
