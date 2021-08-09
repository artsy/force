/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairOrganizerTiming_fair = {
    readonly startAt: string | null;
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
      "name": "exhibitionPeriod",
      "storageKey": null
    }
  ],
  "type": "Fair"
};
(node as any).hash = 'b51728fee266efa71ee2b9fd9de376e2';
export default node;
