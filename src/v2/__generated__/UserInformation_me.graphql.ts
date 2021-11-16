/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserInformation_me = {
    readonly email: string | null;
    readonly name: string | null;
    readonly paddleNumber: string | null;
    readonly phone: string | null;
    readonly " $refType": "UserInformation_me";
};
export type UserInformation_me$data = UserInformation_me;
export type UserInformation_me$key = {
    readonly " $data"?: UserInformation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserInformation_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserInformation_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paddleNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phone",
      "storageKey": null
    }
  ],
  "type": "Me"
};
(node as any).hash = 'a29c2348f8cdd1578f7a63165e764b9a';
export default node;
