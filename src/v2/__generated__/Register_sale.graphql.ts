/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Register_sale = {
    readonly slug: string;
    readonly internalID: string;
    readonly status: string | null;
    readonly requireIdentityVerification: boolean | null;
    readonly " $refType": "Register_sale";
};
export type Register_sale$data = Register_sale;
export type Register_sale$key = {
    readonly " $data"?: Register_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Register_sale">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Register_sale",
  "type": "Sale",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
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
      "name": "status",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "requireIdentityVerification",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '555438fc585fbee0be6171fe3a713deb';
export default node;
