/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ContactInformation_me = {
    readonly name: string | null;
    readonly email: string | null;
    readonly phone: string | null;
    readonly " $refType": "ContactInformation_me";
};
export type ContactInformation_me$data = ContactInformation_me;
export type ContactInformation_me$key = {
    readonly " $data"?: ContactInformation_me$data;
    readonly " $fragmentRefs": FragmentRefs<"ContactInformation_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContactInformation_me",
  "selections": [
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
      "name": "email",
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
(node as any).hash = '77e278abf54c42db3fbaac84e467c6ac';
export default node;
