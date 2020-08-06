/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Register_me = {
    readonly internalID: string;
    readonly identityVerified: boolean | null;
    readonly " $refType": "Register_me";
};
export type Register_me$data = Register_me;
export type Register_me$key = {
    readonly " $data"?: Register_me$data;
    readonly " $fragmentRefs": FragmentRefs<"Register_me">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Register_me",
  "type": "Me",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "identityVerified",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '42bbd95ecd77cb23df8a8249edf9897d';
export default node;
