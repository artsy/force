/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubscriberBanner_partner = {
    readonly hasFairPartnership: boolean | null;
    readonly name: string | null;
    readonly " $refType": "SubscriberBanner_partner";
};
export type SubscriberBanner_partner$data = SubscriberBanner_partner;
export type SubscriberBanner_partner$key = {
    readonly " $data"?: SubscriberBanner_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"SubscriberBanner_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubscriberBanner_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasFairPartnership",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Partner"
};
(node as any).hash = '7487f99627cea3dec4f11e8d0908e5fd';
export default node;
