/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SignUpForm_requestLocation = {
    readonly countryCode: string | null;
    readonly " $refType": "SignUpForm_requestLocation";
};
export type SignUpForm_requestLocation$data = SignUpForm_requestLocation;
export type SignUpForm_requestLocation$key = {
    readonly " $data"?: SignUpForm_requestLocation$data;
    readonly " $fragmentRefs": FragmentRefs<"SignUpForm_requestLocation">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SignUpForm_requestLocation",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "countryCode",
      "storageKey": null
    }
  ],
  "type": "RequestLocation"
};
(node as any).hash = '4e59fe8d3150617db26d33de4fac3bbe';
export default node;
