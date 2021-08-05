/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerTiming_fair = {
    readonly startAt: string | null;
    readonly isActive: boolean | null;
    readonly exhibitionPeriod: string | null;
    readonly " $refType": "FairOrganizerTiming_fair";
};
export type FairOrganizerTiming_fair$data = FairOrganizerTiming_fair;
export type FairOrganizerTiming_fair$key = {
    readonly " $data"?: FairOrganizerTiming_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairOrganizerTiming_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairOrganizerTiming_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isActive",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "exhibitionPeriod",
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = '9a949993f5e50c65ff833dccc5ecc77f';
export default node;
