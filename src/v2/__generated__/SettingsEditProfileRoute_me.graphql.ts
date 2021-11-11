/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileRoute_me = {
    readonly email: string | null;
    readonly name: string | null;
    readonly paddleNumber: string | null;
    readonly phone: string | null;
    readonly internalID: string;
    readonly " $fragmentRefs": FragmentRefs<"UserInformation_me">;
    readonly " $refType": "SettingsEditProfileRoute_me";
};
export type SettingsEditProfileRoute_me$data = SettingsEditProfileRoute_me;
export type SettingsEditProfileRoute_me$key = {
    readonly " $data"?: SettingsEditProfileRoute_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileRoute_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileRoute_me",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserInformation_me"
    }
  ],
  "type": "Me"
};
(node as any).hash = 'c80c7088bfe9fad87ef872a8e9924ed8';
export default node;
